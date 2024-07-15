package br.com.clearcont.clearcontwebapp.views.routes


import br.com.clearcont.clearcontwebapp.configs.security.AuthenticatedUser
import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeisDTO
import br.com.clearcont.clearcontwebapp.models.enums.Role
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.toDTO
import br.com.clearcont.clearcontwebapp.models.toEntity
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.service.FileUploadServiceImplement
import br.com.clearcont.clearcontwebapp.shared.RESPONSAVEL_ID
import br.com.clearcont.clearcontwebapp.views.components.GridConciliar
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import br.com.clearcont.clearcontwebapp.views.components.details.BalanceteDetailsLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.confirmdialog.ConfirmDialog
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

private const val CLOSE_CONCILIATION = "Fechar Conciliação"
private const val REOPEN_CONCILIATION = "Reabrir Conciliação"
private const val REQUEST_REOPEN_CONCILIATION = "Requisitar Abertura de Conciliação"
private const val START_CONCILIATION = "Iniciar Conciliação"
private const val WAITING_REOPEN = "Aguardando Reabertura"

@Route(value = "conciliar", layout = MainLayout::class)
@PermitAll
@PageTitle("Conciliar")
class ConciliarView(
    private val service: BalanceteService,
    private val contabeisService: ComposicaoLancamentosContabeisService,
    private val anexoStorageService: FileUploadServiceImplement,
    private val responsavelRepository: ResponsavelRepository,
    private val balanceteService: BalanceteService,
    private val empresaRepository: EmpresaRepository,
    private val authenticatedUser: AuthenticatedUser
) : VerticalLayout(), HasUrlParameter<String> {

    var log: Logger = Logger.getLogger(javaClass.name)
    private var startBtn: Button = getStartBtn()
    private var finishBtn: Button = getFinishBtn()

    override fun setParameter(event: BeforeEvent, parameter: String) {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val balanceteId = parameter.toLong()
        val balancete = service.getById(balanceteId)
        val responsavel = responsavelRepository.findById(cookieFactory.getCookieInteger(RESPONSAVEL_ID)).orElseThrow()

        log.info("BALANCETE ID: $balanceteId")
        log.info("BALANCETE NOME DA CONTA:  ${balancete?.nomeConta}")

        val conciliacaoList = contabeisService.getByBalanceteID(balanceteId).map { it.toDTO() }.toList()

        val saldoContabil = contabeisService.getSaldoContabil(balanceteId);

        val conciliacao = if (conciliacaoList.isEmpty()) {
            ComposicaoLancamentosContabeisDTO(balancete, responsavel)
        } else {
            conciliacaoList.last()
        }
        val infoCards = BalanceteDetailsLayout(balancete!!, conciliacao.toEntity(), saldoContabil, anexoStorageService)

        val crud = GridConciliar(
            balancete,
            contabeisService,
            balanceteId,
            responsavelRepository,
            infoCards,
            empresaRepository
        ).also {
            it.isEnabled =
                conciliacao.status != StatusConciliacao.OPEN && conciliacao.status != StatusConciliacao.CLOSED
        }

        val isf = InputStreamFactory { crud.exportToExcel(conciliacaoList) }
        val excelStreamResource = StreamResource("grid_data.xlsx", isf)
        val downloadLink = generateExcelDownloadLink(excelStreamResource)

        val btns = HorizontalLayout(startBtn, finishBtn, downloadLink)
        checkStatusforDisableorEnableBtn(conciliacao)


        log.info("RESPONSAVEL NOME: " + responsavel.nome)
        val dialogStart = getConfirmDialogStart(startBtn, conciliacao, balancete)
        val dialogEnd = getConfirmDialogEnd(balancete)

        startBtn.addClickListener { dialogStart.open() }
        finishBtn.addClickListener { dialogEnd.open() }

        log.info("ID COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.id)

        val conciliacaoContabil = VerticalLayout(H1("Conciliação Contábil"), infoCards, btns, crud)
        conciliacaoContabil.alignItems = FlexComponent.Alignment.CENTER

        add(conciliacaoContabil)
    }

    private fun checkStatusforDisableorEnableBtn(conciliacao: ComposicaoLancamentosContabeisDTO) {
        when (conciliacao.status) {
            StatusConciliacao.OPEN -> {
                startBtn.element.setEnabled(true)
                finishBtn.element.setEnabled(false)
                startBtn.element.setText(START_CONCILIATION)
            }

            StatusConciliacao.PROGRESS -> {
                startBtn.element.setEnabled(false)
                finishBtn.element.setEnabled(true)
                startBtn.element.setText(START_CONCILIATION)
            }

            StatusConciliacao.PENDENT_REOPEN -> {
                startBtn.element.setEnabled(false)
                finishBtn.element.setEnabled(false)
                startBtn.element.setText(WAITING_REOPEN)
            }

            StatusConciliacao.CLOSED -> {
                if (authenticatedUser.get().isPresent && authenticatedUser.get().get().roles.contains(Role.ADMIN)) {
                    startBtn.element.setEnabled(true)
                    finishBtn.element.setEnabled(false)
                    startBtn.element.setText(REOPEN_CONCILIATION)
                } else {
                    startBtn.element.setEnabled(true)
                    finishBtn.element.setEnabled(false)
                    startBtn.element.setText(REQUEST_REOPEN_CONCILIATION)
                }
            }
        }
    }

    private fun getStartBtn(): Button {
        val startBtn = Button(START_CONCILIATION)
        startBtn.icon = Icon("calc")
        startBtn.style.setBackground("#0fc90f")
        return startBtn
    }

    private fun getFinishBtn(): Button {
        val finishBtn = Button(CLOSE_CONCILIATION)
        finishBtn.icon = Icon("chevron-down")
        finishBtn.style.setBackground("#ff4000c2")
        return finishBtn
    }

    private fun getConfirmDialogStart(
        startBtn: Button,
        conciliacao: ComposicaoLancamentosContabeisDTO,
        balancete: Balancete,
    ): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        if (startBtn.element.text.equals(START_CONCILIATION)) {
            dialog.setHeader(START_CONCILIATION)
            dialog.setText("Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.")
            dialog.setCancelable(true)
            dialog.setCancelText("Cancelar")
            dialog.setConfirmText("Confirmar")
            dialog.addConfirmListener {
                if (balancete.lancamentosContabeisList.isEmpty()) {
                    contabeisService.createNewAndUpdate(balancete.id, conciliacao.responsavel?.id)
                }
                balancete.status = StatusConciliacao.PROGRESS
                checkStatusforDisableorEnableBtn(conciliacao)
                balanceteService.update(balancete)
                Notification.show("CONCIALIAÇÃO EM ANDAMENTO")
                page.reload()
            }
        } else {
            dialog.setHeader(REOPEN_CONCILIATION)
            dialog.setText("Você tem certeza que deseja reabrir? Um Administrador irá analisar a solicitação.")
            dialog.setCancelable(true)
            dialog.setCancelText("Cancelar")
            dialog.setConfirmText("Confirmar")
            dialog.addConfirmListener {
                if (balancete.lancamentosContabeisList.isEmpty()) {
                    contabeisService.createNewAndUpdate(balancete.id, conciliacao.responsavel?.id)
                }
                balancete.status = StatusConciliacao.PENDENT_REOPEN
                checkStatusforDisableorEnableBtn(conciliacao)
                balanceteService.update(balancete)
                Notification.show("REQUISIÇÃO DE REABERTURA ENVIADA")
                page.reload()
            }
        }

        return dialog
    }

    private fun getConfirmDialogEnd(
        balancete: Balancete,
    ): ConfirmDialog {
        val dialog = ConfirmDialog()
        val ui = UI.getCurrent()
        val page = ui.page

        dialog.setHeader(CLOSE_CONCILIATION)
        dialog.setText("Você tem certeza que deseja finalizar? Essa alteração não pode ser desfeita.")
        dialog.setCancelable(true)
        dialog.setCancelText("Cancelar")
        dialog.setConfirmText("Confirmar")
        dialog.addConfirmListener {
            balancete.status = StatusConciliacao.CLOSED
            balanceteService.update(balancete)
            Notification.show("CONCIALIAÇÃO FINALIZADA")
            page.reload()
        }
        return dialog
    }
}
