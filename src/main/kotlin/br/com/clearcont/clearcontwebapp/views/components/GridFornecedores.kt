package br.com.clearcont.clearcontwebapp.views.components

import br.com.clearcont.clearcontwebapp.helpers.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.service.BalanceteService
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent
import com.vaadin.flow.component.HasValue
import com.vaadin.flow.component.combobox.ComboBox
import com.vaadin.flow.component.datepicker.DatePicker
import com.vaadin.flow.component.html.Anchor
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.function.ValueProvider
import com.vaadin.flow.server.InputStreamFactory
import com.vaadin.flow.server.StreamResource
import jakarta.transaction.Transactional
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.vaadin.crudui.crud.impl.GridCrud
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.logging.Logger
import java.util.stream.Collectors


@Transactional
open class GridFornecedores(
    composicaoService: ComposicaoLancamentosContabeisService,
    balancetes: List<Balancete?>,
    responsavel: Responsavel?,
    month: Int,
    balanceteService: BalanceteService
) : VerticalLayout() {
    private var balanceteID: Long = 0
    private var isf: InputStreamFactory? = null
    private var downloadLink: Anchor = Anchor()
    private var excelStreamResource: StreamResource = StreamResource("fornecedores.xlsx", isf)
    lateinit var balancete: Balancete
    var log: Logger = Logger.getLogger(javaClass.name)

    init {
        val crud = GridCrud(ComposicaoLancamentosContabeis::class.java)
        val formFactory = composicaoLancamentosContabeisDefaultCrudFormFactory

        val balancetePicker = ComboBox<Balancete>()
        crud.isVisible = balancetePicker.value != null
        balancetePicker.setItems(balancetes)
        balancetePicker.setItemLabelGenerator(Balancete::nomeConta)
        balancetePicker.addValueChangeListener { event ->
            val selectedBalancete = event.value
            crud.setVisible(selectedBalancete.id != null)
        }

        val lancamentosContabeis = composicaoService.findByBalanceteID(balanceteID)

        balancetePicker.addValueChangeListener { event: ComponentValueChangeEvent<ComboBox<Balancete?>?, Balancete?> ->
            balancete = balanceteService.getById(balancetePicker.value.id!!)!!
            val selectedBalancete = event.value
            if (selectedBalancete != null) {
                balanceteID = selectedBalancete.id!!
                val updatedContabilCustomers = composicaoService.findByBalanceteID(balanceteID)
                crud.setFindAllOperation {
                    updatedContabilCustomers.stream()
                        .filter { composicaoLancamentosContabeis: ComposicaoLancamentosContabeis ->
                            composicaoLancamentosContabeis.balancete!!.tipo == TipoConta.FORNECEDOR
                        }.toList()
                }
                isf = InputStreamFactory {
                    exportToExcel(
                        updatedContabilCustomers.stream()
                            .filter { composicaoLancamentosContabeisF: ComposicaoLancamentosContabeis ->
                                composicaoLancamentosContabeisF.balancete!!.tipo == TipoConta.FORNECEDOR
                            }.collect(Collectors.toList())
                    )
                }
                updateDownloadLink(crud, composicaoService, downloadLink)
                crud.refreshGrid()
            }
        }

        formFactory.setFieldCreationListener("data") { field: HasValue<*, *> ->
            val datePicker = field as DatePicker
            datePicker.locale = Locale.of("pt", "BR")
            datePicker.addValueChangeListener { event: ComponentValueChangeEvent<DatePicker?, LocalDate> ->
                val selectedDate = event.value
                selectedDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            }
        }
        crud.crudFormFactory = formFactory
        crud.grid.setColumns(
            "numNotaFiscal",
            "dataVencimento",
            "ISS",
            "INSS",
            "IRRF",
            "CSRF",
            "status",
            "data",
            "debito",
            "credito",
            "historico"
        )

        crud.grid.addColumn(ValueProvider<ComposicaoLancamentosContabeis, Any> { customer: ComposicaoLancamentosContabeis ->
            customer.getDiasVencidos(
                month
            )
        }).setHeader("Dias Vencidos")

        crudMethods(crud, lancamentosContabeis, balanceteService, balancetePicker, responsavel, composicaoService)

        downloadLink = generateExcelDownloadLink(excelStreamResource)

        add(balancetePicker, downloadLink, crud)
    }

    @Transactional
    open fun crudMethods(
        crud: GridCrud<ComposicaoLancamentosContabeis>,
        contabilCustomers: List<ComposicaoLancamentosContabeis>,
        balanceteService: BalanceteService,
        balancetePicker: ComboBox<Balancete>,
        responsavel: Responsavel?,
        contabeisService: ComposicaoLancamentosContabeisService
    ) {

        crud.setFindAllOperation {
            contabilCustomers.stream().filter { composicaoLancamentosContabeis: ComposicaoLancamentosContabeis ->
                composicaoLancamentosContabeis.balancete!!.tipo == TipoConta.FORNECEDOR
            }.toList()
        }

        crud.setAddOperation { composicaoLancamentosContabeis: ComposicaoLancamentosContabeis ->
            composicaoLancamentosContabeis.balancete = balancetePicker.value
            composicaoLancamentosContabeis.responsavel = responsavel!!
            composicaoLancamentosContabeis.balancete!!.tipo = TipoConta.FORNECEDOR
            contabeisService.save(composicaoLancamentosContabeis)

            val updatedContabilCustomers = contabeisService.findByBalanceteID(balanceteID)

            crud.setFindAllOperation {
                updatedContabilCustomers.stream()
                    .filter { composicaoLancamentosContabeisF: ComposicaoLancamentosContabeis ->
                        composicaoLancamentosContabeisF.balancete?.tipo == TipoConta.FORNECEDOR
                    }.toList()
            }

            updateDownloadLink(crud, contabeisService, downloadLink)
            composicaoLancamentosContabeis
        }

        crud.setUpdateOperation { entity -> contabeisService.update(entity) }
    }

    private fun exportToExcel(itemList: List<ComposicaoLancamentosContabeis>): ByteArrayInputStream {
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
            row.createCell(2).setCellValue(item.ISS)
            row.createCell(3).setCellValue(item.INSS)
            row.createCell(4).setCellValue(item.IRRF)
            row.createCell(5).setCellValue(item.CSRF)
            row.createCell(6).setCellValue(item.diasVencidos.toDouble())
            row.createCell(7).setCellValue(item.status!!.name)
            row.createCell(8).setCellValue(item.data)
            row.createCell(9).setCellValue(item.getDebito())
            row.createCell(10).setCellValue(item.getDoubleCredito())
            row.createCell(11).setCellValue(item.historico)
        }

        val bos = ByteArrayOutputStream()
        try {
            workbook.write(bos)
        } catch (e: IOException) {
            log.info(e.message)
        } finally {
            try {
                workbook.close()
            } catch (e: IOException) {
                log.info(e.message)
            }
        }

        return ByteArrayInputStream(bos.toByteArray())
    }

    private fun updateDownloadLink(
        crud: GridCrud<ComposicaoLancamentosContabeis>,
        contabeisService: ComposicaoLancamentosContabeisService,
        downloadLink: Anchor
    ) {
        val updatedContabilCustomers = contabeisService.findByBalanceteID(balanceteID)
        isf = InputStreamFactory {
            exportToExcel(
                updatedContabilCustomers.stream()
                    .filter { composicaoLancamentosContabeisF: ComposicaoLancamentosContabeis ->
                        composicaoLancamentosContabeisF.balancete!!.tipo == TipoConta.FORNECEDOR
                    }
                    .collect(Collectors.toList())
            )
        }
        crud.refreshGrid()
        excelStreamResource = StreamResource("clientes.xlsx", isf)
        downloadLink.setHref(excelStreamResource)
    }

    companion object {
        private val composicaoLancamentosContabeisDefaultCrudFormFactory: DefaultCrudFormFactory<ComposicaoLancamentosContabeis>
            get() {
                val formFactory = DefaultCrudFormFactory(
                    ComposicaoLancamentosContabeis::class.java
                )
                formFactory.setVisibleProperties(
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
                return formFactory
            }
    }
}
