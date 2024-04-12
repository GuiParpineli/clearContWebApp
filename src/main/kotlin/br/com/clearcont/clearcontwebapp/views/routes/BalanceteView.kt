package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.grid.ItemDoubleClickEvent
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H3
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.upload.Upload
import com.vaadin.flow.component.upload.receivers.MemoryBuffer
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse
import jakarta.annotation.security.PermitAll
import jakarta.transaction.Transactional
import org.apache.poi.ss.usermodel.Row
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
        getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)
                val responsavelID = cookieFactory.getCookieInteger("responsavel-id")
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val id = empresa?.id
                val companyName = empresa?.nomeEmpresa
                log.info("MES DO BALANCETE: $month,  PERFIL ID: $id")
                val balanceteData = service.getByCompanyAndPeriod(id!!, month!!, LocalDate.now().year)

                val totalSize = balanceteData.size
                log.info("TAMANHO TOTAL DA LISTA BALANCETE: $totalSize")
                val year =
                    if (balanceteData.isEmpty()) LocalDate.now().year.toString() else balanceteData.first().ano.toString()

                val titleText = H3(getTitle(companyName, month, year))

                val title = getTitleDiv(titleText)
                val grid = getBalanceteGridCrud(service, balanceteData)
                val singleFileUpload = getUpload(service, empresa, month, responsavel)
                add(title, grid, singleFileUpload)
            }
        }
    }

    private fun getTitle(companyName: String?, month: String?, year: String): String {
        return "EMPRESA: $companyName | MES: $month | ANO: $year"
    }

    private fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?, month: String?) {
        if (empresa == null || month == null || empresa.nomeEmpresa == null) {
            Notification.show("Selecione uma empresa e periodo")
            UI.getCurrent().navigate("/")
        }
    }

    private fun getTitleDiv(titleText: H3): Div {
        val title = Div(titleText)
        title.style.setPadding("20px")
        return title
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
                val rowIterator: Iterator<Row> = sheet.iterator()
                if (rowIterator.hasNext()) rowIterator.next()
                val balancetes: MutableList<Balancete?> = ArrayList()
                while (rowIterator.hasNext()) {
                    val row = rowIterator.next()
                    balancetes.add(
                        Balancete(
                            0L,
                            empresa,
                            row.getCell(1).stringCellValue,
                            row.getCell(0).numericCellValue.toInt(),
                            row.getCell(2).numericCellValue,
                            TypeCount.valueOf(row.getCell(3).stringCellValue),
                            month,
                            LocalDate.now().year,
                            mutableListOf(ComposicaoLancamentosContabeis(responsavel))
                        )
                    )
                    service.saveAll(empresa.id!!, balancetes)
                    UI.getCurrent().page.reload()
                    log.info("TAMANHO BALANTE INSERIDO : ${balancetes.size}")
                }
                workbook.close()
            } catch (e: IOException) {
                log.info("ERRO: ${e.message}")
            }
        }
        return singleFileUpload
    }

    private fun getBalanceteGridCrud(
        service: BalanceteService,
        balanceteData: List<Balancete>
    ): GridCrud<Balancete> {
        val grid = GridCrud(Balancete::class.java)
        val formFactory = DefaultCrudFormFactory(Balancete::class.java)
        formFactory.setVisibleProperties("nomeConta", "numeroConta", "totalBalancete", "classificacao")
        grid.crudFormFactory = formFactory
        grid.grid.setColumns("nomeConta", "numeroConta", "totalBalancete", "classificacao")
        grid.grid.isColumnReorderingAllowed = true
        grid.style["border-radius"] = "10px"
        grid.setAddOperation { balancete ->
            balancete.empresa = empresa
            balancete.mes = month.toString()
            service.save(balancete!!)
            UI.getCurrent().page.reload()
            balancete
        }
        grid.setUpdateOperation { balancete: Balancete? -> service.update(balancete!!) }
        grid.setDeleteOperation { balancete: Balancete? -> service.delete(balancete!!) }
        grid.setFindAllOperation { balanceteData }
        grid.grid.addComponentColumn { balanceteComp: Balancete ->
            val editButton = Button("Conciliar")
            editButton.addClickListener {
                UI.getCurrent().navigate("conciliar/" + balanceteComp.id)
            }
            editButton
        }.setWidth("150px").setFlexGrow(0)

        grid.grid.addItemDoubleClickListener { event: ItemDoubleClickEvent<Balancete> ->
            val balancete = event.item
            UI.getCurrent().navigate("conciliar/" + balancete.id)
        }
        return grid
    }
}
