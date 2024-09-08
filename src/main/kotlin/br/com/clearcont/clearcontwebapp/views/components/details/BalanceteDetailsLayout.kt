package br.com.clearcont.clearcontwebapp.views.components.details

import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.services.GridConciliarListener
import br.com.clearcont.clearcontwebapp.services.impl.FileUploadServiceImplement
import br.com.clearcont.clearcontwebapp.utils.helpers.formatCurrencyBR
import com.vaadin.flow.component.Composite
import com.vaadin.flow.component.Text
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H3
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.dom.Style
import com.vaadin.flow.spring.annotation.UIScope
import org.slf4j.LoggerFactory


@UIScope
open class BalanceteDetailsLayout(
    private val balancete: Balancete,
    private val conciliacao: ComposicaoLancamentosContabeis,
    private val saldoContabil: Double,
    private val anexoStorageService: FileUploadServiceImplement?,
    private val ui: UI
) : Composite<HorizontalLayout>(), GridConciliarListener {
    private val log = LoggerFactory.getLogger(BalanceteDetailsLayout::class.java)
    private lateinit var diferencaLayout: FlexLayout
    private var diferencaValue = Text("Diferença: ${formatCurrencyBR(saldoContabil)}")

    init {
        buildLayout()
    }

    private fun buildLayout() {
        diferencaLayout = FlexLayout().apply { this.add(diferencaValue) }

        val accountName = createStyledLayout("Nome da conta: ", balancete.nomeConta)
        val accountNumber = createStyledLayout("Numero da conta: ", balancete.numeroConta.toString())
        val conciliationStatusLabel = createStyledLayout("Status conciliação: ", conciliacao.status?.value)
        val composicaoSaldoLayout =
            createStyledLayout("Composição do Saldo Contábil: ", formatCurrencyBR(saldoContabil))

        calculateDifference(saldoContabil)

        val infos = FlexLayout(
            accountName,
            accountNumber,
            conciliationStatusLabel,
            composicaoSaldoLayout,
            diferencaLayout
        ).apply {
            addClassName("card")
            alignItems = FlexComponent.Alignment.START
            flexDirection = FlexLayout.FlexDirection.COLUMN
        }

        val documentosAnexadosTitle = H3("Documentos Anexados").apply {
            style.setTextAlign(Style.TextAlign.CENTER)
        }

        val documentosAnexadosDiv = Div(
            documentosAnexadosTitle,
            anexoStorageService?.let {
                balancete.empresa?.nomeEmpresa?.let { companyName ->
                    DownloadComponent(it, conciliacao, companyName)
                }
            }
        ).apply {
            addClassName("card")
            minWidth = "200px"
        }

        val infosCards = FlexLayout(documentosAnexadosDiv, infos).apply {
            style.setPadding("10px")
                .setBackgroundColor("azure")
                .setBorder("1px solid black")
                .setBorderRadius("30px")
            flexWrap = FlexLayout.FlexWrap.WRAP
            setFlexShrink(20.0)
            justifyContentMode = FlexComponent.JustifyContentMode.AROUND
        }

        content.add(infosCards)
    }

    private fun calculateDifference(saldoContabil: Double) {
        diferencaValue.text = "Diferença: ${formatCurrencyBR(saldoContabil)}"
    }

    private fun refreshLayout() {
        log.info("Refreshing layout")
        content.removeAll()
        buildLayout()
        ui.push()
        log.info("UI pushed")
    }

    private fun createStyledLayout(label: String, value: String?): FlexLayout {
        val span = Span(value).apply {
            style.set("font-weight", "800")["padding-left"] = "5px"
        }
        return FlexLayout(Span(label), span)
    }

    override fun onSaldoContabilChanged(saldoContabil: Double) {
        ui.access {
            diferencaValue.text = "Diferença: ${formatCurrencyBR(saldoContabil)}"
            ui.push()
            refreshLayout()
            log.info("Atualizando detalhes: Saldo Contábil Balancete: $saldoContabil")
        }
    }

}
