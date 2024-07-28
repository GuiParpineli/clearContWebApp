package br.com.clearcont.clearcontwebapp.views.components

import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.repositories.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repositories.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.services.impl.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.utils.helpers.*
import br.com.clearcont.clearcontwebapp.utils.shared.RESPONSAVEL_ID
import br.com.clearcont.clearcontwebapp.views.components.details.BalanceteDetailsLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.datepicker.DatePicker
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.upload.Upload
import com.vaadin.flow.component.upload.receivers.MemoryBuffer
import com.vaadin.flow.data.provider.ListDataProvider
import com.vaadin.flow.server.VaadinResponse
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.vaadin.crudui.crud.impl.GridCrud
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory
import java.io.ByteArrayInputStream
import java.io.IOException
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.logging.Logger

class GridConciliar(
    balancete: Balancete,
    service: ComposicaoLancamentosContabeisService,
    balanceteId: Long?,
    responsavelRepository: ResponsavelRepository,
    infoCards: BalanceteDetailsLayout,
    empresaRepository: EmpresaRepository,
) : VerticalLayout(), MonthAndCompany {
    var log: Logger = Logger.getLogger(javaClass.name)
    override var month: String? = null
    override lateinit var empresa: Empresa

    init {
        this.getCompany(empresaRepository) { empresa: Empresa? ->
            getMonth {
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                val responsavelID = cookieFactory.getCookieInteger(RESPONSAVEL_ID)
                val responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                val crud = GridCrud(ComposicaoLancamentosContabeisDTO::class.java)
                val formFactory = DefaultCrudFormFactory(ComposicaoLancamentosContabeisDTO::class.java)
                val dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))

                formFactory.setVisibleProperties("data", "debito", "credito", "historico")

                formFactory.setFieldCreationListener("data") { field ->
                    val datePicker = field as DatePicker
                    datePicker.locale = Locale.of("pt", "BR")
                    datePicker.addValueChangeListener { event ->
                        val selectedDate = event.value
                        selectedDate.format(dateTimeFormatter)
                    }
                }

                crud.crudFormFactory = formFactory
                crud.grid.setColumns()
                crud.grid.addColumn(ComposicaoLancamentosContabeisDTO::dataFormated).setHeader("Data")
                crud.grid.addColumn({ it.credito }).setHeader("Credito").setKey("credito")
                crud.grid.addColumn({ it.debito }).setHeader("Debito")
                crud.grid.addColumn({ formatCurrencyBR(it.saldoContabil) }).setHeader("Saldo Contabil").setKey("saldoContabil")
                crud.grid.addColumn({ it.status.value }).setHeader("Status")
                crud.grid.addColumn({ it.historico.toString() }).setHeader("Historico")
                val listDataProvider = ListDataProvider(service.getByBalanceteID(balanceteId).map { it.toDTO() })
                crud.grid.dataProvider = listDataProvider

                val newSaldoContabil = service.getSaldoContabil(balanceteId)

                crud.setAddOperation { lancamentosContabeis ->
                    lancamentosContabeis.balancete = balancete
                    lancamentosContabeis.responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
                    service.atualizarSaldoContabil(balanceteId, crud)
                    service.save(lancamentosContabeis.toEntity())
                    infoCards.updateDiferencaLayout(
                        balancete.getTotalBalanceteDouble(),
                        newSaldoContabil
                    )
                    listDataProvider.refreshAll()
                    lancamentosContabeis
                }

                crud.setFindAllOperation {
                    val all = service.getByBalanceteID(balanceteId).map { it.toDTO() }.toList()
                    service.atualizarSaldoContabil(balanceteId, crud)
                    infoCards.apply {
                        infoCards.updateDiferencaLayout(
                            balancete.getTotalBalanceteDouble(),
                            newSaldoContabil
                        )
                    }
                    listDataProvider.refreshAll()
                    all
                }

                crud.setDeleteOperation { lancamentosContabeis ->
                    service.deleteByID(lancamentosContabeis.id!!)
                    service.atualizarSaldoContabil(balanceteId, crud)
                    infoCards.apply {
                        infoCards.updateDiferencaLayout(
                            balancete.getTotalBalanceteDouble(),
                            newSaldoContabil
                        )
                    }
                    listDataProvider.refreshAll()
                }

                crud.setUpdateOperation { a: ComposicaoLancamentosContabeisDTO ->
                    service.update(a.toEntity())
                    service.atualizarSaldoContabil(balanceteId, crud)
                    infoCards.apply {
                        infoCards.updateDiferencaLayout(
                            balancete.getTotalBalanceteDouble(),
                            newSaldoContabil
                        )
                    }
                    listDataProvider.refreshAll()
                    a
                }
                val singleFileUpload =
                    getUpload(service, empresa, balancete, responsavel).apply { style.setMargin("10px") }

                add(singleFileUpload, crud)
            }
        }
    }

    fun exportToExcel(itemList: List<ComposicaoLancamentosContabeisDTO>): ByteArrayInputStream {
        val workbook: Workbook = XSSFWorkbook()
        val sheet = workbook.createSheet("Data")

        val headers = arrayOf("Data", "Débito", "Crédito", "Saldo Contábil", "Histórico")

        val headerRow = sheet.createRow(0)
        for (i in headers.indices) {
            val headerCell = headerRow.createCell(i)
            headerCell.setCellValue(headers[i])
        }

        var rowIndex = 1
        for (item in itemList) {
            val row = sheet.createRow(rowIndex++)

            row.createCell(0).setCellValue(item.dataFormated)
            row.createCell(1).setCellValue(unformatCurrencyBR(item.debito))
            row.createCell(2).setCellValue(unformatCurrencyBR(item.credito))
            row.createCell(3).setCellValue(item.saldoContabil)
            row.createCell(4).setCellValue(item.historico)
        }

        return writeWorkbookToByteArrayInputStream(workbook, log)
    }

    private fun getUpload(
        service: ComposicaoLancamentosContabeisService,
        empresa: Empresa?,
        balancete: Balancete,
        responsavel: Responsavel?
    ): Upload {
        val memoryBuffer = MemoryBuffer()
        val singleFileUpload = Upload(memoryBuffer)

        singleFileUpload.addSucceededListener {
            try {
                val workbook: Workbook = XSSFWorkbook(memoryBuffer.inputStream)
                val sheet = workbook.getSheetAt(0)
                val rowIterator: Iterator<Row> = sheet.iterator()
                if (rowIterator.hasNext()) rowIterator.next()
                val composicoesList: MutableList<ComposicaoLancamentosContabeisDTO> = ArrayList()
                val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))
                while (rowIterator.hasNext()) {

                    val row = rowIterator.next()

                    row.getCell(3)?.stringCellValue?.let { data ->
                        row.getCell(1)?.numericCellValue?.let { it2 -> formatCurrencyBR(it2) }?.let { historico ->
                            row.getCell(2)?.numericCellValue?.let { it2 -> formatCurrencyBR(it2) }?.let { debito ->
                                ComposicaoLancamentosContabeisDTO(
                                    null,
                                    LocalDate.from(row.getCell(0)?.stringCellValue?.let { it1 -> formatter.parse(it1) }),
                                    data,
                                    historico,
                                    debito,
                                    balancete,
                                    responsavel!!,
                                    StatusConciliacao.PROGRESS
                                )
                            }
                        }
                    }?.let { it2 -> composicoesList.add(it2) }
                }

                service.saveAll(empresa!!.id!!, composicoesList.map { it.toEntity() }.toMutableList())
                UI.getCurrent().page.reload()
                log.info("QUANTIDADE DE COMPOSICOES INSERIDAS : ${composicoesList.size}")

                workbook.close()

            } catch (e: IOException) {
                log.info("ERRO: ${e.message}")
            }
        }

        return singleFileUpload
    }
}
