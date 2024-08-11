package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.utils.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.utils.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.utils.helpers.Period.getMonthByPeriodoString
import br.com.clearcont.clearcontwebapp.utils.helpers.createTitle
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta.FORNECEDOR
import br.com.clearcont.clearcontwebapp.repositories.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repositories.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.services.impl.BalanceteService
import br.com.clearcont.clearcontwebapp.services.impl.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.utils.helpers.verifySelectedCompanyAndMonthExistAndNavigate
import br.com.clearcont.clearcontwebapp.utils.shared.RESPONSAVEL_ID
import br.com.clearcont.clearcontwebapp.views.components.GridFornecedores
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.notification.NotificationVariant
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.RolesAllowed
import java.time.LocalDate
import java.util.logging.Logger

@Route(value = "fornecedores", layout = MainLayout::class)
@PageTitle("Fornecedores")
@RolesAllowed("ADMIN")
class FornecedoresView(
    composicaoService: ComposicaoLancamentosContabeisService,
    empresaRepository: EmpresaRepository,
    balanceteService: BalanceteService,
    responsavelRepository: ResponsavelRepository
) : FlexLayout(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    var log: Logger = Logger.getLogger(javaClass.name)


    init {
        initializeView(composicaoService, empresaRepository, balanceteService, responsavelRepository)
    }

    private fun initializeView(
        customerContabilRepository: ComposicaoLancamentosContabeisService,
        empresaRepository: EmpresaRepository,
        balanceteService: BalanceteService,
        responsavelRepository: ResponsavelRepository
    ) {
        this.getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                val responsavelID = cookieFactory.getCookieInteger(RESPONSAVEL_ID)
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val empresaId = empresa!!.id
                val balanceteData =
                    balanceteService.filterClassification(empresaId!!, month!!, LocalDate.now().year, FORNECEDOR)
                log.info("Empresa selecionada: ${empresa.nomeEmpresa}")
                log.info("Tamanho balancete: $balanceteData")

                val gridCustomer = GridFornecedores(
                    customerContabilRepository,
                    balanceteData,
                    responsavel,
                    getMonthByPeriodoString(month),
                    balanceteService,
                )

                val clientes = createTitle("Fornecedores").apply { width = "50%" }
                val span = Span(empresa.nomeEmpresa)
                val subtitle = Span("Selecione uma conta do periodo: " + month + " " + LocalDate.now().year)
                val titleLayout = VerticalLayout(clientes, span, subtitle)
                val verticalLayout = VerticalLayout(titleLayout, gridCustomer)

                add(verticalLayout)
            }
        }
    }

}
