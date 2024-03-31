package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.helpers.Period.getMonthByPeriodoString
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.TypeCount
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.CustomerContabilService
import br.com.clearcont.clearcontwebapp.views.MainLayout
import br.com.clearcont.clearcontwebapp.views.components.GridCustomer
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.RolesAllowed
import java.time.LocalDate
import java.util.logging.Logger


@Route(value = "clientes", layout = MainLayout::class)
@PageTitle("Clientes| ClearCont App")
@RolesAllowed("ADMIN")
class CustomersView(
    customerContabilRepository: CustomerContabilService,
    empresaRepository: EmpresaRepository,
    balanceteService: BalanceteService,
    responsavelRepository: ResponsavelRepository
) : FlexLayout(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    var log: Logger = Logger.getLogger(javaClass.name)

    init {
        initializeView(customerContabilRepository, empresaRepository, balanceteService, responsavelRepository)
    }

    private fun initializeView(
        customerContabilRepository: CustomerContabilService,
        empresaRepository: EmpresaRepository,
        balanceteService: BalanceteService,
        responsavelRepository: ResponsavelRepository
    ) {
        getCompany(
            empresaRepository
        ) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                val responsavelID = cookieFactory.getCookieInteger("responsavel-id")
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val empresaId = empresa!!.id
                val balanceteData =
                    balanceteService.filterClassification(empresaId!!, month!!, LocalDate.now().year, TypeCount.ATIVO)
                log.info("Empresa selecionada: " + empresa.nomeEmpresa)
                val gridCustomer = GridCustomer(
                    customerContabilRepository, balanceteData, responsavel, getMonthByPeriodoString(
                        month
                    )
                )
                val clientes = H1("Clientes")
                val span = Span(empresa.nomeEmpresa)
                val subtitle = Span("Selecione uma conta do periodo: " + month + " " + LocalDate.now().year)
                val verticalLayout = VerticalLayout(VerticalLayout(clientes, span, subtitle), gridCustomer)
                add(verticalLayout)
            }
        }
    }

    private fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?, month: String?) {
        if (empresa == null || month == null || empresa.nomeEmpresa == null) {
            Notification.show("Selecione uma empresa e periodo")
            UI.getCurrent().navigate("/")
        }
    }
}
