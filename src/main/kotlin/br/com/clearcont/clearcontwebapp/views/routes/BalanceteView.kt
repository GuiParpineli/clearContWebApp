package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.helpers.createTitle
import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.Responsavel
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.models.enums.TypeCount
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
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
        this.getCompany(empresaRepository) { empresa: Empresa? ->
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

    private fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?, month: String?) {
        if (empresa == null || month == null || empresa.nomeEmpresa == null) {
            Notification.show("Selecione uma empresa e periodo")
            UI.getCurrent().navigate("/")
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
                val rowIterator: Iterator<Row> = sheet.iterator()
                if (rowIterator.hasNext()) rowIterator.next()
                val balancetes: MutableList<Balancete> = ArrayList()

                while (rowIterator.hasNext()) {

                    val row = rowIterator.next()

                    row.getCell(0)?.stringCellValue?.let { nomeConta ->
                        row.getCell(1)?.numericCellValue?.let { numeroConta ->
                            row.getCell(2)?.numericCellValue?.let { totalBalancete ->
                                row.getCell(3)?.stringCellValue?.let { classificacao ->
                                    Balancete(
                                        id = 0L,
                                        empresa = empresa,
                                        nomeConta = nomeConta,
                                        numeroConta = numeroConta.toInt(),
                                        totalBalancete = totalBalancete,
                                        classificacao = TypeCount.valueOf(classificacao.uppercase()),
                                        mes = month,
                                        ano = LocalDate.now().year,
                                        lancamentosContabeisList = mutableListOf(
                                            ComposicaoLancamentosContabeis(
                                                responsavel
                                            )
                                        ),
                                        tipo = row.getCell(4)?.stringCellValue?.uppercase()
                                            ?.let { TipoConta.valueOf(it) } ?: TipoConta.INDEFINIDO
                                    )
                                }
                            }
                        }
                    }?.let { element -> balancetes.add(element) }
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
        formFactory.setVisibleProperties("nomeConta", "numeroConta", "totalBalancete", "classificacao", "tipo")

        val grid = GridCrud(Balancete::class.java).apply {
            crudFormFactory = formFactory
            grid.setColumns("nomeConta", "numeroConta", "totalBalancete", "tipo")
            grid.isColumnReorderingAllowed = true
            style["border-radius"] = "10px"

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
                UI.getCurrent().navigate("conciliar/" + balancete.id)
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
