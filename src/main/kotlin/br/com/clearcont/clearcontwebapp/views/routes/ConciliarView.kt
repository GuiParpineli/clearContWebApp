package br.com.clearcont.clearcontwebapp.views.routes


import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.service.FileUploadServiceImplement
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import br.com.clearcont.clearcontwebapp.views.components.GridConciliar
import br.com.clearcont.clearcontwebapp.views.components.details.BalanceteDetailsLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.confirmdialog.ConfirmDialog
import com.vaadin.flow.component.confirmdialog.ConfirmDialog.ConfirmEvent
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.BeforeEvent
import com.vaadin.flow.router.HasUrlParameter
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.InputStreamFactory
import com.vaadin.flow.server.StreamResource
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.PermitAll
import org.springframework.beans.factory.annotation.Autowired
import java.util.logging.Logger

@Route(value = "conciliar", layout = MainLayout::class)
@PermitAll
@PageTitle("Conciliar")
class ConciliarView @Autowired constructor(
    private val service: BalanceteService,
    private val contabeisService: ComposicaoLancamentosContabeisService,
    private val anexoStorageService: FileUploadServiceImplement,
    private val responsavelRepository: ResponsavelRepository,
    private val balanceteService: BalanceteService
) : VerticalLayout(), HasUrlParameter<String> {

    var log: Logger = Logger.getLogger(javaClass.name)
    private var startBtn: Button = getStartBtn()
    private var finishBtn: Button = getFinishBtn()

    override fun setParameter(event: BeforeEvent, parameter: String) {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val balanceteId = parameter.toLong()
        val balancete = service.getById(balanceteId)
        val responsavel = responsavelRepository.findById(cookieFactory.getCookieInteger("responsavel-id")).orElseThrow()

        log.info("BALANCETE ID: $balanceteId")
        log.info("BALANCETE NOME DA CONTA:  ${balancete?.nomeConta}")

        var conciliacaoList = contabeisService.getByBalanceteID(balanceteId).map { it.toDTO() }.toList()


        val saldoContabil = contabeisService.getSaldoContabil(balanceteId);

        val conciliacao = if (conciliacaoList.isEmpty()) {
            ComposicaoLancamentosContabeisDTO(balancete, responsavel)
        } else {
            conciliacaoList.last()
        }
        val infoCards = BalanceteDetailsLayout(balancete!!, conciliacao.toEntity(), saldoContabil, anexoStorageService)
        val crud = GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository, infoCards)

        val finalConciliacaoList = conciliacaoList
        val isf = InputStreamFactory { crud.exportToExcel(finalConciliacaoList) }
        val excelStreamResource = StreamResource("grid_data.xlsx", isf)
        val downloadLink = generateExcelDownloadLink(excelStreamResource)

        val btns = HorizontalLayout(startBtn, finishBtn, downloadLink)
        checkStatusforDisableorEnableBtn(conciliacao)

        crud.isEnabled = conciliacao.status != StatusConciliacao.OPEN && conciliacao.status != StatusConciliacao.CLOSED

        log.info("RESPONSAVEL NOME: " + responsavel.nome)
        val dialogStart = getConfirmDialogStart(conciliacao, balancete)
        val dialogEnd = getConfirmDialogEnd(balancete)

        startBtn.addClickListener { dialogStart.open() }
        finishBtn.addClickListener { dialogEnd.open() }

        log.info("ID COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.id)

        val conciliacaoContabil = VerticalLayout(H1("Conciliação Contábil"), infoCards, btns, crud)
        conciliacaoContabil.alignItems = FlexComponent.Alignment.CENTER

        add(conciliacaoContabil)
    }

    private fun checkStatusforDisableorEnableBtn(conciliacao: ComposicaoLancamentosContabeisDTO) {
        if (conciliacao.status == StatusConciliacao.PROGRESS || conciliacao.status == StatusConciliacao.CLOSED) {
            startBtn.element.setEnabled(false)
        }

        if (conciliacao.status == StatusConciliacao.OPEN || conciliacao.status == StatusConciliacao.CLOSED) {
            finishBtn.element.setEnabled(false)
        }
    }

    private fun getStartBtn(): Button {
        val startBtn = Button("Iniciar Conciliação")
        startBtn.icon = Icon("calc")
        startBtn.style.setBackground("#0fc90f")
        return startBtn
    }

    private fun getFinishBtn(): Button {
        val finishBtn = Button("Fechar Conciliação")
        finishBtn.icon = Icon("chevron-down")
        finishBtn.style.setBackground("#ff4000c2")
        return finishBtn
    }

    private fun getConfirmDialogStart(
        conciliacao: ComposicaoLancamentosContabeisDTO,
        balancete: Balancete,
    ): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        dialog.setHeader("Iniciar conciliação")
        dialog.setText("Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.")
        dialog.setCancelable(true)
        dialog.setCancelText("Cancelar")
        dialog.setConfirmText("Confirmar")
        dialog.addConfirmListener {
            if (balancete.lancamentosContabeisList.isEmpty()) {
                contabeisService.createNewAndUpdate(balancete.id, conciliacao.responsavel?.id)
            }
            checkStatusforDisableorEnableBtn(conciliacao)
            balancete.status = StatusConciliacao.PROGRESS
            balanceteService.update(balancete)
            Notification.show("CONCIALIAÇÃO EM ANDAMENTO")
            page.reload()
        }
        return dialog
    }

    private fun getConfirmDialogEnd(
        balancete: Balancete,
    ): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        dialog.setHeader("Finalizar conciliação")
        dialog.setText("Você tem certeza que deseja finalizar? Essa alteração não pode ser desfeita.")
        dialog.setCancelable(true)
        dialog.setCancelText("Cancelar")
        dialog.setConfirmText("Confirmar")
        dialog.addConfirmListener { dialogEvent: ConfirmEvent? ->
            balancete.status = StatusConciliacao.CLOSED
            balanceteService.update(balancete)
            Notification.show("CONCIALIAÇÃO FINALIZADA")
            page.reload()
        }
        return dialog
    }
}
