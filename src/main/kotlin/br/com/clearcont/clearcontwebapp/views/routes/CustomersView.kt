package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.helpers.Period.getMonthByPeriodoString
import br.com.clearcont.clearcontwebapp.helpers.createTitle
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta.CLIENTE
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.views.components.GridCustomer
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
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
    composicaoService: ComposicaoLancamentosContabeisService,
    empresaRepository: EmpresaRepository,
    balanceteService: BalanceteService,
    responsavelRepository: ResponsavelRepository
) : FlexLayout(), MonthAndCompany {

    override var month: String? = null
    override lateinit var empresa: Empresa
    private val log: Logger = Logger.getLogger(javaClass.name)

    init {
        initializeView(composicaoService, empresaRepository, balanceteService, responsavelRepository)
    }

    private fun initializeView(
        customerContabilRepository: ComposicaoLancamentosContabeisService,
        empresaRepository: EmpresaRepository,
        balanceteService: BalanceteService,
        responsavelRepository: ResponsavelRepository
    ) {
        getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)

                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                val responsavelID = cookieFactory.getCookieInteger("responsavel-id")
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val empresaId = empresa!!.id
                val balanceteData =
                    balanceteService.filterClassification(empresaId!!, month!!, LocalDate.now().year, CLIENTE)

                log.info("Empresa selecionada: " + empresa.nomeEmpresa)

                val gridCustomer = GridCustomer(
                    customerContabilRepository,
                    balanceteData,
                    responsavel,
                    getMonthByPeriodoString(month),
                    balanceteService,
                    empresa
                )

                val clientes = createTitle("Clientes").apply { width = "50%" }
                val span = Span(empresa.nomeEmpresa)
                val subtitle = Span("Selecione uma conta do periodo: " + month + " " + LocalDate.now().year)
                val titleLayout = VerticalLayout(clientes, span, subtitle)
                val verticalLayout = VerticalLayout(titleLayout, gridCustomer)

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
