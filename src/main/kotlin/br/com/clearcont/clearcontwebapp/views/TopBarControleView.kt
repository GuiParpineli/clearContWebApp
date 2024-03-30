package br.com.clearcont.clearcontwebapp.views

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.service.ControleService
import br.com.clearcont.clearcontwebapp.views.components.controle.TopBarText
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.Image
import com.vaadin.flow.component.html.Paragraph
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.page.Page
import com.vaadin.flow.dom.Style
import elemental.json.JsonValue
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.function.Consumer

class TopBarControleView(controleService: ControleService, empresaRepository: EmpresaRepository) : FlexLayout() {
    var month: String? = null
    var empresa: Empresa? = null
    private var ui: UI = UI.getCurrent()
    private var page: Page = ui.page

    fun createSeparator(): Div {
        val separator = Div()
        separator.style.setBackground("white")
        separator.width = "2px"
        return separator
    }

    private fun getCompany(empresaRepository: EmpresaRepository, callback: Consumer<Empresa?>) {
        page.executeJs("return sessionStorage.getItem($0)", "company-name")
            .then { item: JsonValue ->
                empresa = empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElseThrow()
                println("Valor do sessionStorage para 'company-name': " + item.asString())
                callback.accept(empresa)
            }
    }

    private fun getMonth(callback: Consumer<String?>) {
        page.executeJs("return sessionStorage.getItem($0)", "month")
            .then { item: JsonValue ->
                month = item.asString()
                println("Valor do sessionStorage para 'month': " + item.asString())
                callback.accept(month)
            }
    }

    init {
        getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth { month: String? ->
                val year = LocalDate.now().year
                val id = empresa!!.id

                val empresaTopBar = controleService.getAllByMonthAndCompanyID(id!!, month!!, year).last().empresa
                val controle = controleService.getAllByMonthAndCompanyID(id, month, year).first()
                val logo = Image("./images/logo-white.png", "Logo")
                logo.maxHeight = "80px"
                logo.style.setPadding("50px")

                val b1 = TopBarText.make("Empresa:", "CNPJ:", "Competência:")
                val b2 = Div(
                    Paragraph(empresaTopBar!!.nomeEmpresa),
                    Paragraph(empresaTopBar.cnpj),
                    Paragraph(
                        controle.dataCompetencia
                            ?.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
                    )
                )
                val b3 = TopBarText.make("Resumo Balancete:", "ATIVO:", "PASSIVO:", "PL:", "RESULTADO:")
                val b4 = Div(
                    Paragraph("Valor"),
                    Paragraph(controle.circulante!!.name),
                    Paragraph(controle.getSaldoAnalise()),
                    Paragraph(controle.getSaldoBalancete()),
                    Paragraph(formatCurrencyBR(controle.doubleSaldoBalancete - controle.doubleSaldoAnalise))
                )
                val b5 = Div(
                    VerticalLayout(
                        FlexComponent.Alignment.CENTER,
                        Paragraph("Baixar Balancete Final em Excel: "),
                        Button(Icon("download"))
                    )
                )

                b1.style.setPadding("20px")
                b2.style.setTextAlign(Style.TextAlign.RIGHT)
                b2.style.setPadding("20px")
                b4.style.setTextAlign(Style.TextAlign.RIGHT)
                b4.style.setPadding("20px")
                b3.style.setPadding("20px")
                b5.style.setColor("white")

                val companyInfo = FlexLayout(createSeparator(), b1, b2)
                companyInfo.style["flex"] = "auto"
                companyInfo.justifyContentMode = JustifyContentMode.AROUND
                companyInfo.style.setColor("white")
                companyInfo.setFlexBasis("25%")

                val companyBalanceteResume = FlexLayout(createSeparator(), b3, b4)
                companyBalanceteResume.style["flex"] = "auto"
                companyBalanceteResume.justifyContentMode = JustifyContentMode.AROUND
                companyBalanceteResume.style.setColor("white")
                companyBalanceteResume.style.setPadding("20px")
                companyBalanceteResume.setFlexBasis("25%")

                val downloadBalancete = FlexLayout(createSeparator(), b5)
                downloadBalancete.style["flex"] = "auto"
                downloadBalancete.justifyContentMode = JustifyContentMode.AROUND
                downloadBalancete.style.setColor("white")
                downloadBalancete.style.setPadding("20px")
                downloadBalancete.setFlexBasis("25%")

                val items = FlexLayout(
                    logo, companyInfo, companyBalanceteResume, downloadBalancete
                )
                items.alignItems = FlexComponent.Alignment.CENTER
                items.flexWrap = FlexWrap.WRAP
                items.alignContent = ContentAlignment.SPACE_BETWEEN
                items.style.setPadding("10px")
                items.maxWidth = "80vw"

                val div = FlexLayout(items)
                div.style.setBackground("black")
                div.style["border-radius"] = "12px"
                div.flexWrap = FlexWrap.WRAP

                this.flexDirection = FlexDirection.COLUMN
                add(div)
            }
        }
    }
}
