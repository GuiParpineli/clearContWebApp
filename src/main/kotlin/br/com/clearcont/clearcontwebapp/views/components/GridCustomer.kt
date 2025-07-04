package br.com.clearcont.clearcontwebapp.views.components

import br.com.clearcont.clearcontwebapp.utils.helpers.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.utils.helpers.unformatCurrencyBR
import br.com.clearcont.clearcontwebapp.utils.helpers.writeWorkbookToByteArrayInputStream
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.services.impl.BalanceteService
import br.com.clearcont.clearcontwebapp.services.impl.ComposicaoLancamentosContabeisService
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.combobox.ComboBox
import com.vaadin.flow.component.datepicker.DatePicker
import com.vaadin.flow.component.html.Anchor
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.upload.Upload
import com.vaadin.flow.component.upload.receivers.MemoryBuffer
import com.vaadin.flow.dom.Style
import com.vaadin.flow.server.InputStreamFactory
import com.vaadin.flow.server.StreamResource
import jakarta.transaction.Transactional
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
import java.util.stream.Collectors


@Transactional
open class GridCustomer(
    service: ComposicaoLancamentosContabeisService,
    balancetes: List<Balancete?>,
    responsavel: Responsavel?,
    month: Int,
    balanceteService: BalanceteService,
    empresa: Empresa?
) : VerticalLayout() {
    private var balanceteID: Long = 0
    private var isf: InputStreamFactory? = null
    private var downloadLink: Anchor = Anchor()
    private var excelStreamResource: StreamResource = StreamResource("clientes.xlsx", isf)
    lateinit var balancete: Balancete
    var log: Logger = Logger.getLogger(javaClass.name)
    private val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))

    init {
        val crud = GridCrud(ComposicaoLancamentosContabeisFullDTO::class.java)
        val formFactory = composicaoLancamentosContabeisDefaultCrudFormFactory
        val files = HorizontalLayout()

        val balancetePicker = ComboBox<Balancete>()
        crud.isVisible = balancetePicker.value != null
        balancetePicker.setItems(balancetes)
        balancetePicker.setItemLabelGenerator(Balancete::nomeConta)
        balancetePicker.addValueChangeListener { event -> event.value.also { crud.setVisible(it.id != null) } }

        val lancamentosContabeis = service.findByBalanceteID(balanceteID).map { it.toFullDTO() }.toList()

        balancetePicker.addValueChangeListener { event ->
            balancete = balanceteService.getById(balancetePicker.value.id!!)!!

            event.value?.let { selectedBalancete ->

                balanceteID = selectedBalancete.id!!
                val updatedContabilCustomers = service.findByBalanceteID(balanceteID).map { it.toFullDTO() }.toList()

                crud.setFindAllOperation {
                    updatedContabilCustomers.stream().filter { it.balancete!!.tipo == TipoConta.CLIENTE }.toList()
                }

                isf = InputStreamFactory {
                    exportToExcel(
                        updatedContabilCustomers.stream().filter { it.balancete!!.tipo == TipoConta.CLIENTE }
                            .collect(Collectors.toList())
                    )
                }

                updateDownloadLink(crud, service, downloadLink)

                getUpload(service, empresa, balancete, responsavel).apply { style.setPadding("20px") }.also {
                    style.setMargin("10px")
                    files.add(HorizontalLayout(it, downloadLink).apply {
                        style.setAlignSelf(Style.AlignSelf.CENTER).setAlignItems(Style.AlignItems.CENTER)
                    })
                }

                crud.refreshGrid()
            }
        }

        formFactory.setFieldCreationListener("data") { field ->
            val datePicker = field as DatePicker
            datePicker.locale = Locale.of("pt", "BR")
            datePicker.addValueChangeListener { event ->
                val selectedDate = event.value
                selectedDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            }
        }

        crud.crudFormFactory = formFactory
        crud.grid.setColumns("numNotaFiscal")
        crud.grid.addColumn(
            { formatter.format(it.data) }).setHeader("Data")
        crud.grid.addColumn(
            { formatter.format(it.dataVencimento) }).setHeader("Data Vencimento")
        crud.grid.addColumn(
            { it.ISS }).setHeader("ISS")
        crud.grid.addColumn(
            { it.INSS }).setHeader("INSS")
        crud.grid.addColumn(
            { it.IRRF }).setHeader("IRRF")
        crud.grid.addColumn(
            { it.CSRF }).setHeader("CSRF")
        crud.grid.addColumn(
            { it.debito }).setHeader("Debito")
        crud.grid.addColumn(
            { it.credito }).setHeader("Credito")
        crud.grid.addColumn(
            { it.status.value }).setHeader("Status")
        crud.grid.addColumn(
            { it.getDiasVencidos(month) }).setHeader("Dias Vencidos")
        crud.grid.addColumn(
            { it.historico.toString() }).setHeader("Historico")

        this.crudMethods(crud, lancamentosContabeis, balanceteService, balancetePicker, responsavel, service)

        downloadLink = generateExcelDownloadLink(excelStreamResource)
        files.add(FlexLayout(downloadLink).apply
        {
            style.setAlignSelf(Style.AlignSelf.CENTER)
                .setAlignItems(Style.AlignItems.CENTER)
        })

        this.add(files, balancetePicker, crud)
    }

    @Transactional
    open fun crudMethods(
        crud: GridCrud<ComposicaoLancamentosContabeisFullDTO>,
        contabilCustomers: List<ComposicaoLancamentosContabeisFullDTO>,
        balanceteService: BalanceteService,
        balancetePicker: ComboBox<Balancete>,
        responsavel: Responsavel?,
        contabeisService: ComposicaoLancamentosContabeisService
    ) {

        crud.setFindAllOperation {
            contabilCustomers.stream().filter { composicaoLancamentosContabeis ->
                composicaoLancamentosContabeis.balancete!!.tipo == TipoConta.CLIENTE
            }.toList()
        }

        crud.setAddOperation { composicaoLancamentosContabeis ->
            composicaoLancamentosContabeis.balancete = balancetePicker.value
            composicaoLancamentosContabeis.responsavel = responsavel!!
            composicaoLancamentosContabeis.balancete!!.tipo = TipoConta.CLIENTE
            contabeisService.save(composicaoLancamentosContabeis.toEntity())

            val updatedContabilCustomers =
                contabeisService.findByBalanceteID(balanceteID).map { it.toFullDTO() }.toList()

            crud.setFindAllOperation {
                updatedContabilCustomers.stream()
                    .filter { composicaoLancamentosContabeisF ->
                        composicaoLancamentosContabeisF.balancete?.tipo == TipoConta.CLIENTE
                    }.toList()
            }

            updateDownloadLink(crud, contabeisService, downloadLink)
            composicaoLancamentosContabeis
        }

        crud.setDeleteOperation {
            contabeisService.deleteByID(it.id!!)
//            UI.getCurrent().page.reload()
            crud.refreshGrid()
        }

        crud.setUpdateOperation { entity -> contabeisService.update(entity.toEntity()).toFullDTO() }
    }

    private fun exportToExcel(itemList: MutableList<ComposicaoLancamentosContabeisFullDTO>): ByteArrayInputStream {
        val workbook: Workbook = XSSFWorkbook()
        val sheet = workbook.createSheet("Data")

        val headers = arrayOf(
            "numNotaFiscal",
            "dataVencimento",
            "ISS",
            "INSS",
            "IRRF",
            "CSRF",
            "diasVencidos",
            "status",
            "data",
            "debito",
            "credito",
            "historico"
        )

        val headerRow = sheet.createRow(0)
        for (i in headers.indices) {
            val headerCell = headerRow.createCell(i)
            headerCell.setCellValue(headers[i])
        }

        var rowIndex = 1
        for (item in itemList) {
            val row = sheet.createRow(rowIndex++)
            row.createCell(0).setCellValue(item.numNotaFiscal.toDouble())
            row.createCell(1).setCellValue(item.getDataVencimento())
            row.createCell(2).setCellValue(unformatCurrencyBR(item.ISS))
            row.createCell(3).setCellValue(unformatCurrencyBR(item.INSS))
            row.createCell(4).setCellValue(unformatCurrencyBR(item.IRRF))
            row.createCell(5).setCellValue(unformatCurrencyBR(item.CSRF))
            row.createCell(6).setCellValue(item.diasVencidos.toDouble())
            row.createCell(7).setCellValue(item.status.name)
            row.createCell(8).setCellValue(formatter.format(item.data))
            row.createCell(9).setCellValue(unformatCurrencyBR(item.debito))
            row.createCell(10).setCellValue(unformatCurrencyBR(item.credito))
            row.createCell(11).setCellValue(item.historico)
        }
        return writeWorkbookToByteArrayInputStream(workbook, log)
    }

    private fun updateDownloadLink(
        crud: GridCrud<ComposicaoLancamentosContabeisFullDTO>,
        contabeisService: ComposicaoLancamentosContabeisService,
        downloadLink: Anchor
    ) {
        val updatedContabilCustomers = contabeisService.findByBalanceteID(balanceteID).map { it.toFullDTO() }.toList()
        isf = InputStreamFactory {
            exportToExcel(
                updatedContabilCustomers.stream()
                    .filter { composicaoLancamentosContabeisF ->
                        composicaoLancamentosContabeisF.balancete!!.tipo == TipoConta.CLIENTE
                    }
                    .collect(Collectors.toList())
            )
        }
        crud.refreshGrid()
        excelStreamResource = StreamResource("clientes.xlsx", isf)
        downloadLink.setHref(excelStreamResource)
    }

    private val composicaoLancamentosContabeisDefaultCrudFormFactory: DefaultCrudFormFactory<ComposicaoLancamentosContabeisFullDTO>
        get() {
            return DefaultCrudFormFactory(ComposicaoLancamentosContabeisFullDTO::class.java).apply {
                setVisibleProperties(
                    "numNotaFiscal",
                    "dataVencimento",
                    "ISS",
                    "INSS",
                    "IRRF",
                    "CSRF",
                    "diasVencidos",
                    "status",
                    "data",
                    "debito",
                    "credito",
                    "historico"
                )
            }
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
                val composicoesList: MutableList<ComposicaoLancamentosContabeis> = ArrayList()
                val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))
                while (rowIterator.hasNext()) {

                    val row = rowIterator.next()
                    row.getCell(0)?.numericCellValue?.toInt()?.let { it1 ->
                        row.getCell(9)?.stringCellValue?.let { it2 ->
                            ComposicaoLancamentosContabeis(
                                null,
                                it1,
                                LocalDate.from(row.getCell(1)?.stringCellValue?.let { it3 -> formatter.parse(it3) }),
                                LocalDate.from(row.getCell(6)?.stringCellValue?.let { it4 -> formatter.parse(it4) }),
                                row.getCell(2)?.numericCellValue!!,
                                row.getCell(3)?.numericCellValue!!,
                                row.getCell(4)?.numericCellValue!!,
                                row.getCell(5)?.numericCellValue!!,
                                0,
                                it2,
                                row.getCell(7)?.numericCellValue!!,
                                row.getCell(8)?.numericCellValue!!,
                                balancete,
                                StatusConciliacao.PROGRESS,
                                responsavel!!
                            )
                        }
                    }?.let { it2 -> composicoesList.add(it2) }

                    service.saveAll(empresa!!.id!!, composicoesList)
                    log.info(" COMPOSICAO CLIENTE INSERIDAS : $composicoesList")
                }

                workbook.close()
                UI.getCurrent().page.reload()

            } catch (e: IOException) {
                log.info("ERRO: ${e.message}")
            }
        }

        return singleFileUpload
    }
}
