package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.Responsavel
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.models.enums.TypeCount
import br.com.clearcont.clearcontwebapp.repositories.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repositories.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.services.impl.BalanceteService
import br.com.clearcont.clearcontwebapp.utils.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.utils.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.utils.helpers.createTitle
import br.com.clearcont.clearcontwebapp.utils.helpers.verifySelectedCompanyAndMonthExistAndNavigate
import br.com.clearcont.clearcontwebapp.utils.shared.RESPONSAVEL_ID
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.upload.Upload
import com.vaadin.flow.component.upload.receivers.MemoryBuffer
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.PermitAll
import jakarta.transaction.Transactional
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.vaadin.crudui.crud.impl.GridCrud
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory
import java.io.IOException
import java.time.LocalDate
import java.util.logging.Logger


@Route(value = "balancete", layout = MainLayout::class)
@PageTitle("Balancete")
@PermitAll
@Transactional
class BalanceteView(
    service: BalanceteService,
    empresaRepository: EmpresaRepository,
    private val responsavelRepository: ResponsavelRepository
) : Div(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    val log: Logger = Logger.getLogger(javaClass.name)

    init {
        processCompanyAndMonth(empresaRepository, service)
    }

    private fun processCompanyAndMonth(empresaRepository: EmpresaRepository, service: BalanceteService) {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        this.getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)
                val responsavelID = cookieFactory.getCookieInteger(RESPONSAVEL_ID)
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val id = empresa?.id
                val companyName = empresa?.nomeEmpresa
                log.info("MES DO BALANCETE: $month,  PERFIL ID: $id")
                val balanceteData = service.getByCompanyAndPeriod(id!!, month!!, LocalDate.now().year)

                val totalSize = balanceteData.size
                log.info("TAMANHO TOTAL DA LISTA BALANCETE: $totalSize")

                val year = if (balanceteData.isEmpty()) LocalDate.now().year.toString()
                else balanceteData.first().ano.toString()

                val titleText = createTitle("EMPRESA: $companyName")
                val titleText2 = createTitle("MÊS: $month")
                val titleText3 = createTitle("ANO: $year")

                val divTitle = HorizontalLayout(titleText, titleText2, titleText3).apply { style.setMargin("10px") }
                val grid = getBalanceteGridCrud(service, balanceteData)
                val singleFileUpload = getUpload(service, empresa, month, responsavel).apply { style.setMargin("10px") }
                add(divTitle, singleFileUpload, grid)
            }
        }
    }

private fun getUpload(
    service: BalanceteService,
    empresa: Empresa,
    month: String,
    responsavel: Responsavel
): Upload {
    val memoryBuffer = MemoryBuffer()
    val singleFileUpload = Upload(memoryBuffer)

    singleFileUpload.addSucceededListener {
        try {
            val workbook: Workbook = XSSFWorkbook(memoryBuffer.inputStream)
            val sheet = workbook.getSheetAt(0)
            val balancetes = mutableListOf<Balancete>()

            sheet.drop(1).forEach { row ->
                val nomeConta = row.getCell(0)?.stringCellValue
                val numeroConta = row.getCell(1)?.numericCellValue?.toInt()
                val totalBalancete = row.getCell(2)?.numericCellValue
                val classificacao = row.getCell(3)?.stringCellValue?.uppercase()?.let { TypeCount.valueOf(it) }
                val tipo = row.getCell(4)?.stringCellValue?.uppercase()?.let { TipoConta.valueOf(it) } ?: TipoConta.INDEFINIDO

                if (nomeConta != null && numeroConta != null && totalBalancete != null && classificacao != null) {
                    balancetes.add(
                        Balancete(
                            id = 0L,
                            empresa = empresa,
                            nomeConta = nomeConta,
                            numeroConta = numeroConta,
                            totalBalancete = totalBalancete,
                            classificacao = classificacao,
                            mes = month,
                            ano = LocalDate.now().year,
                            lancamentosContabeisList = mutableListOf(ComposicaoLancamentosContabeis(responsavel)),
                            tipo = tipo
                        )
                    )
                }
            }

            log.info("TAMANHO BALANTE INSERIDO : ${balancetes.size}")
            workbook.close()
            service.saveAll(empresa.id!!, balancetes)
            UI.getCurrent().page.reload()
        } catch (e: IOException) {
            log.info("ERRO: ${e.message}")
        }
    }

    return singleFileUpload
}

    private fun getBalanceteGridCrud(service: BalanceteService, balanceteData: List<Balancete>): GridCrud<Balancete> {
        val formFactory = DefaultCrudFormFactory(Balancete::class.java)
        formFactory.setVisibleProperties("nomeConta", "numeroConta", "totalBalancete", "classificacao", "tipo", "status")

        val grid = GridCrud(Balancete::class.java).apply {
            crudFormFactory = formFactory
            grid.setColumns("nomeConta", "numeroConta", "totalBalancete", "tipo")
            grid.isColumnReorderingAllowed = true
            style["border-radius"] = "10px"
            grid.addColumn{
                it.status.value
            }.setHeader("Status")

            setAddOperation {
                it.empresa = empresa
                it.mes = month.toString()
                service.save(it!!)
                UI.getCurrent().page.reload()
                it
            }
            setUpdateOperation { service.update(it!!) }
            setDeleteOperation { service.delete(it!!) }
            setFindAllOperation { balanceteData }

            grid.addComponentColumn { createStatusBadge(it.classificacao) }.setHeader("Classificação")

            grid.addComponentColumn { balanceteComp ->
                val editButton = Button("Conciliar")
                editButton.addClickListener { UI.getCurrent().navigate("conciliar/" + balanceteComp.id) }
                editButton
            }.setWidth("150px").setFlexGrow(0)

            grid.addItemDoubleClickListener { event ->
                val balancete = event.item
                UI.getCurrent().navigate("conciliar/${balancete.id}")
                UI.getCurrent().page.setLocation("conciliar/${balancete.id}")
            }

        }

        return grid
    }

    private fun createStatusBadge(status: TypeCount): Span {
        val theme = when (status) {
            TypeCount.ATIVO -> "badge primary"
            TypeCount.PASSIVO -> "badge error primary"
        }
        val badge = Span(status.name)
        badge.element.themeList.add(theme)
        return badge
    }
}
