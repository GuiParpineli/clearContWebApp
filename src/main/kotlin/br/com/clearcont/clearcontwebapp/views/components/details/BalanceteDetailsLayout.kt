package br.com.clearcont.clearcontwebapp.views.components.details

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.service.FileUploadServiceImplement
import com.vaadin.flow.component.Text
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H3
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.dom.Style


class BalanceteDetailsLayout(
    balancete: Balancete,
    conciliacao: ComposicaoLancamentosContabeis,
    saldoContabil: Double,
    anexoStorageService: FileUploadServiceImplement?
) : HorizontalLayout() {
    private var diferencaLayout: FlexLayout = FlexLayout()
    private var diferencaValue: Text = Text("0.00")

    init {
        val accountName = createStyledLayout("Nome da conta: ", balancete.nomeConta)
        val accountNumber = createStyledLayout("Numero da conta: ", balancete.numeroConta.toString())
        val conciliationStatusLabel = createStyledLayout("Status conciliação: ", conciliacao.status.value)
        val composicaoSaldoLayout =
            createStyledLayout("Composição do Saldo Contábil: ", formatCurrencyBR(saldoContabil))

        val differenceSpan = Span(
            formatCurrencyBR(
                balancete.doubleTotalBalancete!! - saldoContabil
            )
        )
        differenceSpan.style.set("font-weight", "800")["padding-left"] = "5px"
        val newC = HorizontalLayout(Span("Diferença: "), differenceSpan)
        diferencaLayout.replace(diferencaValue, newC)

        val infos = FlexLayout(
            accountName,
            accountNumber,
            conciliationStatusLabel,
            composicaoSaldoLayout,
            diferencaLayout
        )
        infos.addClassName("card")
        infos.alignItems = FlexComponent.Alignment.START
        infos.flexDirection = FlexLayout.FlexDirection.COLUMN

        val documentosAnexadosTitle = H3("Documentos Anexados")
        documentosAnexadosTitle.style.setTextAlign(Style.TextAlign.CENTER)
        val documentosAnexadosDiv = Div(
            documentosAnexadosTitle,
            anexoStorageService?.let { balancete.empresa!!.nomeEmpresa?.let { it1 ->
                DownloadComponent(it, conciliacao,
                    it1
                )
            } }
        )
        documentosAnexadosDiv.addClassName("card")
        documentosAnexadosDiv.minWidth = "200px"
        val infosCards = FlexLayout(documentosAnexadosDiv, infos)
        infosCards.style.setPadding("10px")
        infosCards.flexWrap = FlexLayout.FlexWrap.WRAP
        infosCards.setFlexShrink(20.0)
        infosCards.justifyContentMode = JustifyContentMode.AROUND
        add(infosCards)
    }

    fun updateDiferencaLayout(saldoContabilBalancete: Double, saldoContabilDaGrid: Double) {
        val diferenca = saldoContabilBalancete - saldoContabilDaGrid
        diferencaValue.text = "R$ " + (formatCurrencyBR(diferenca))
    }

    private fun createStyledLayout(label: String, value: String?): FlexLayout {
        val span = Span(value)
        span.style.set("font-weight", "800")["padding-left"] = "5px"
        return FlexLayout(Span(label), span)
    }
}
