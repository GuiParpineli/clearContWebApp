package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.details.BalanceteDetailsLayout
import br.com.clearcont.clearcontwebapp.details.GridConciliar
import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.DownloadExcel.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.Responsavel
import br.com.clearcont.clearcontwebapp.models.StatusConciliacao
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.service.FileUploadServiceImplement
import com.vaadin.flow.component.ClickEvent
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
import com.vaadin.flow.server.VaadinService
import jakarta.annotation.security.PermitAll
import org.springframework.beans.factory.annotation.Autowired
import java.util.List
import java.util.logging.Logger

@Route(value = "conciliar", layout = MainLayout::class)
@PermitAll
@PageTitle("Conciliar")
class ConciliarView @Autowired constructor(
    private val service: BalanceteService,
    private val contabeisService: ComposicaoLancamentosContabeisService,
    private val anexoStorageService: FileUploadServiceImplement,
    private val responsavelRepository: ResponsavelRepository
) : VerticalLayout(), HasUrlParameter<String> {
    var log: Logger = Logger.getLogger(javaClass.name)
    var startBtn: Button = getStartBtn()
    var finishBtn: Button = getFinishBtn()

    override fun setParameter(event: BeforeEvent, parameter: String) {
        val cookieFactory = CookieFactory(VaadinService.getCurrentResponse())
        val balanceteId = parameter.toLong()
        val balancete = service.getById(balanceteId)
        log.info("BALANCETE ID: $balanceteId")
        log.info("BALANCETE NOME DA CONTA: " + balancete.nomeConta)


        var conciliacaoList = contabeisService.getByBalanceteID(balanceteId)
        if (conciliacaoList.isEmpty()) {
            conciliacaoList = List.of(ComposicaoLancamentosContabeis())
            contabeisService.update(conciliacaoList.first)
        }
        val saldoContabil = contabeisService.getSaldoContabil(balanceteId)

        val conciliacao = conciliacaoList.last
        val infoCards = BalanceteDetailsLayout(balancete, conciliacao, saldoContabil, anexoStorageService)
        val crud = GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository, infoCards)

        val finalConciliacaoList = conciliacaoList
        val isf = InputStreamFactory { crud.exportToExcel(finalConciliacaoList) }
        val excelStreamResource = StreamResource("grid_data.xlsx", isf)

        val downloadLink = generateExcelDownloadLink(excelStreamResource)

        val btns = HorizontalLayout(startBtn, finishBtn, downloadLink)
        checkStatusforDisableorEnableBtn(conciliacao)

        crud.isEnabled = conciliacao.status != StatusConciliacao.OPEN && conciliacao.status != StatusConciliacao.CLOSED

        val responsavel = responsavelRepository.findById(cookieFactory.getCookieInteger("responsavel-id")).orElseThrow()
        log.info("RESPONSAVEL NOME: " + responsavel.nome)
        val dialogStart = getConfirmDialogStart(conciliacao, balancete, responsavel)
        val dialogEnd = getConfirmDialogEnd(conciliacao)

        startBtn.addClickListener { click: ClickEvent<Button?>? -> dialogStart.open() }
        finishBtn.addClickListener { click: ClickEvent<Button?>? -> dialogEnd.open() }

        log.info("ID COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.id)

        val conciliacaoContabil = VerticalLayout(H1("Conciliação Contábil"), infoCards, btns, crud)
        conciliacaoContabil.alignItems = FlexComponent.Alignment.CENTER

        add(conciliacaoContabil)
    }

    private fun checkStatusforDisableorEnableBtn(conciliacao: ComposicaoLancamentosContabeis) {
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
        conciliacao: ComposicaoLancamentosContabeis,
        balancete: Balancete,
        responsavel: Responsavel
    ): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        dialog.setHeader("Iniciar conciliação")
        dialog.setText("Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.")
        dialog.setCancelable(true)
        dialog.setCancelText("Cancelar")
        dialog.setConfirmText("Confirmar")
        dialog.addConfirmListener { dialogEvent: ConfirmEvent? ->
            if (conciliacao.responsavel == null) {
                contabeisService.saveWithCustomer(
                    ComposicaoLancamentosContabeis(balancete, responsavel),
                    CustomerContabil()
                )
            }
            checkStatusforDisableorEnableBtn(conciliacao)
            conciliacao.status = StatusConciliacao.PROGRESS
            contabeisService.update(conciliacao)
            Notification.show("CONCIALIAÇÃO EM ANDAMENTO")
            page.reload()
        }
        return dialog
    }

    private fun getConfirmDialogEnd(conciliacao: ComposicaoLancamentosContabeis): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        dialog.setHeader("Finalizar conciliação")
        dialog.setText("Você tem certeza que deseja finalizar? Essa alteração não pode ser desfeita.")
        dialog.setCancelable(true)
        dialog.setCancelText("Cancelar")
        dialog.setConfirmText("Confirmar")
        dialog.addConfirmListener { dialogEvent: ConfirmEvent? ->
            conciliacao.status = StatusConciliacao.CLOSED
            contabeisService.update(conciliacao)
            Notification.show("CONCIALIAÇÃO FINALIZADA")
            page.reload()
        }
        return dialog
    }
}
