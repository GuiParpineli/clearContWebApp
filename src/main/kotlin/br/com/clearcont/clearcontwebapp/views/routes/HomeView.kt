package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.EmpresaGroup
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.service.EmpresaGroupService
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.combobox.ComboBox
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.component.html.Image
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.page.Page
import com.vaadin.flow.dom.Style
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.PermitAll
import org.springframework.beans.factory.annotation.Value
import java.time.Month
import java.time.format.TextStyle
import java.util.*
import java.util.logging.Logger
import java.util.stream.Stream

@Route(value = "", layout = MainLayout::class)
@PageTitle("Home")
@PermitAll
class HomeView(empresaGroupService: EmpresaGroupService, empresaRepository: EmpresaRepository?) : Div(),
    MonthAndCompany {
    var log: Logger = Logger.getLogger(javaClass.name)
    override lateinit var empresa: Empresa
    override var month: String? = null


    @Value("\${version}")
    private val version: String? = null

    private fun setComboBoxValues(companyPicker: ComboBox<String>, monthPicker: ComboBox<String>) {
        UI.getCurrent().page.executeJs("return sessionStorage.getItem('month')")
            .then(String::class.java) { savedMonth: String? ->
                if (!savedMonth.isNullOrEmpty()) {
                    monthPicker.value = savedMonth
                }
            }
        UI.getCurrent().page.executeJs("return sessionStorage.getItem('company-name')")
            .then(String::class.java) { savedCompanyName: String? ->
                if (!savedCompanyName.isNullOrEmpty()) {
                    companyPicker.value = savedCompanyName
                }
            }
    }

    init {
        val ui = UI.getCurrent()
        val page = ui.page
        getCompany(empresaRepository!!) { empresa: Empresa? ->
            getMonth { month: String? ->
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                val id = cookieFactory.getCookieInteger("company-group-id")
                val companyList = empresaGroupService.getByID(id)

                if (companyList != null) {
                    log.info("ID COMPANY GROUP RETORNADA: " + companyList.id)
                }
                if (companyList != null) {
                    log.info("QUANTIDADE DE EMPRESAS NO GRUPO RETORNADA: " + companyList.empresas!!.size)
                }

                val h1 = H1("Sistema de Conciliação Contábil")
                val logo = Image("./images/logo-clear-black.png", "Logo cont")
                logo.maxHeight = "150px"

                val companyPicker = companyList?.let { getCompanyPicker(it, page) }
                val monthPicker = companyPicker?.let { getMonthPicker(it, page) }

                UI.getCurrent()
                    .addAttachListener {
                        if (companyPicker != null) {
                            if (monthPicker != null) {
                                setComboBoxValues(companyPicker, monthPicker)
                            }
                        }
                    }

                if (month != null && empresa!!.nomeEmpresa != null) {
                    monthPicker?.value = month
                    companyPicker?.value = empresa.nomeEmpresa
                }

                val horizontalLayout = HorizontalLayout(companyPicker, monthPicker)
                horizontalLayout.alignItems = FlexComponent.Alignment.BASELINE

                val confirmButton = confirmButton
                val versionFooter = versionFooter
                val verticalLayout = getFlexLayout(h1, logo, horizontalLayout, confirmButton, versionFooter)
                add(HorizontalLayout(FlexComponent.JustifyContentMode.CENTER, verticalLayout))
            }
        }
    }

    private val versionFooter: Span
        get() {
            val versionFooter = Span("Versão $version - Todos direitos reservados.").apply {
                style.setTextAlign(Style.TextAlign.CENTER).setPadding("30px")
                style.setPosition(Style.Position.ABSOLUTE).setBottom("0")
            }
            return versionFooter
        }

    private fun getMonthPicker(companyPicker: ComboBox<String>, page: Page): ComboBox<String> {
        val monthPicker = ComboBox<String>("Selecione o Período: ")

        val locale = Locale.Builder().setLanguage("pt").setRegion("BR").build()
        monthPicker.setItems(
            Stream.of(*Month.entries.toTypedArray())
                .map { months: Month -> months.getDisplayName(TextStyle.FULL, locale).uppercase(Locale.getDefault()) }
                .toList())
        monthPicker.style.setPadding("30px")
        monthPicker.addValueChangeListener { monthPicker.getValue() }
        monthPicker.addValueChangeListener { companyPicker.getValue() }

        monthPicker.style.setTextAlign(Style.TextAlign.CENTER)

        monthPicker.addValueChangeListener { event: ComponentValueChangeEvent<ComboBox<String?>?, String> ->
            page.executeJs("sessionStorage.setItem($0, $1)", "month", event.value)
            page.executeJs("sessionStorage.setItem('month', $0)", event.value)
            log.info("PERÍODO SELECIONADO: " + event.value)
        }
        return monthPicker
    }

    private val confirmButton: Button
        get() {
            val confirmButton = Button("Confirmar")
            confirmButton.style.setBackground("green")
            confirmButton.style["color"] = "white"
            confirmButton.addClickListener { UI.getCurrent().navigate("/balancete") }
            return confirmButton
        }

    private fun getCompanyPicker(companyList: EmpresaGroup, page: Page): ComboBox<String> {
        val companyPicker = ComboBox<String>("Seleciona a Empresa: ")
        companyPicker.setItems(companyList.empresas!!.stream().map(Empresa::nomeEmpresa).toList())

        companyPicker.addValueChangeListener { event: ComponentValueChangeEvent<ComboBox<String?>?, String?> ->
            page.executeJs("sessionStorage.setItem($1, $1)", "company-name", event.value)
            page.executeJs("sessionStorage.setItem('company-name', $0)", event.value)
        }
        companyPicker.addValueChangeListener { event: ComponentValueChangeEvent<ComboBox<String?>?, String> ->
            page.executeJs("sessionStorage.setItem($1, $1)", "company-name", event.value)
            page.executeJs("sessionStorage.setItem('company-name', $0)", event.value)
            println("EMPRESA SELECIONADA: " + event.value)
        }
        return companyPicker
    }

    private fun getFlexLayout(
        h1: H1,
        logo: Image,
        horizontalLayout: HorizontalLayout,
        confirmButton: Button,
        versionFooter: Span
    ): FlexLayout {
        val verticalLayout = FlexLayout(h1, logo, horizontalLayout, confirmButton, versionFooter)
        verticalLayout.flexDirection = FlexLayout.FlexDirection.COLUMN
        verticalLayout.alignItems = FlexComponent.Alignment.CENTER
        verticalLayout.flexWrap = FlexLayout.FlexWrap.WRAP
        verticalLayout.style.setMargin("20px")
        verticalLayout.height = "100vh"
        return verticalLayout
    }
}
