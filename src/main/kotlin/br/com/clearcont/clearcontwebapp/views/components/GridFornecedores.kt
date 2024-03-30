package br.com.clearcont.clearcontwebapp.views

import br.com.clearcont.clearcontwebapp.helpers.DownloadExcel.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.service.CustomerContabilService
import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent
import com.vaadin.flow.component.HasValue
import com.vaadin.flow.component.HasValue.ValueChangeListener
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
class GridFornecedores(
    customerService: CustomerContabilService,
    balancetes: List<Balancete?>,
    responsavel: Responsavel?,
    month: Int
) : VerticalLayout() {
    private var balanceteID: Long = 0
    private var isf: InputStreamFactory? = null
    private var downloadLink: Anchor = Anchor()
    private var excelStreamResource: StreamResource = StreamResource("fornecedores.xlsx", isf)
    val log: Logger = Logger.getLogger(javaClass.name)

    init {
        val crud = GridCrud(CustomerContabil::class.java)
        val formFactory = customerContabilDefaultCrudFormFactory
        val balancetePicker = ComboBox<Balancete>()
        crud.isVisible = balancetePicker.value != null
        balancetePicker.setItems(balancetes)
        balancetePicker.setItemLabelGenerator(Balancete::nomeConta)
        balancetePicker.addValueChangeListener { event ->
            val selectedBalancete = event.value
            if (selectedBalancete != null) {
                crud.isVisible = selectedBalancete.id != null
            }
        }

        if (balancetes == null || balancetes.isEmpty()) {
            crud.grid.isEnabled = false
        }

        val contabilCustomers = customerService.findByBalanceteID(balanceteID)
        balancetePicker.addValueChangeListener { event: ComponentValueChangeEvent<ComboBox<Balancete?>?, Balancete?> ->
            val selectedBalancete = event.value
            if (selectedBalancete != null) {
                balanceteID = selectedBalancete.id!!
                val updatedContabilCustomers = customerService.findByBalanceteID(balanceteID)
                crud.setFindAllOperation {
                    updatedContabilCustomers.stream().filter { customerContabil: CustomerContabil ->
                        customerContabil.composicaoLancamentosContabeis
                            ?.balancete!!.classificacao == TypeCount.PASSIVO
                    }.toList()
                }
                isf = InputStreamFactory {
                    exportToExcel(
                        updatedContabilCustomers.stream().filter { customerContabilF: CustomerContabil ->
                            customerContabilF.composicaoLancamentosContabeis
                                ?.balancete!!.classificacao == TypeCount.PASSIVO
                        }
                            .collect(Collectors.toList())
                    )
                }
                updateDownloadLink(crud, customerService, downloadLink)
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
        crud.setCrudFormFactory(formFactory)
        crud.grid.setColumns(
            "numNotaFiscal",
            "dataVencimento",
            "ISS",
            "INSS",
            "IRRF",
            "CSRF",
            "diasVencidos",
            "status",
            "composicaoData",
            "composicaoDebito",
            "composicaoCredito",
            "composicaoHistorico"
        )
        crud.grid.addColumn(ValueProvider<CustomerContabil, Any> { customer: CustomerContabil ->
            customer.getDiasVencidos(
                month
            )
        }).setHeader("Dias Vencidos")

        crud.setFindAllOperation {
            contabilCustomers.stream().filter { customerContabil: CustomerContabil ->
                customerContabil.composicaoLancamentosContabeis
                    .balancete!!.classificacao == TypeCount.PASSIVO
            }.toList()
        }

        crud.setAddOperation { customerContabil: CustomerContabil ->
            val composicao = ComposicaoLancamentosContabeis()
            customerContabil.composicaoLancamentosContabeis = composicao
            customerContabil.composicaoLancamentosContabeis!!.balancete = balancetePicker.value
            customerContabil.composicaoLancamentosContabeis!!.balancete!!.classificacao = TypeCount.PASSIVO
            customerContabil.composicaoLancamentosContabeis!!.responsavel = responsavel!!
            composicao.customerContabil = customerContabil
            customerService.save(customerContabil)

            val updatedContabilCustomers = customerService.findByBalanceteID(balanceteID)
            crud.setFindAllOperation {
                updatedContabilCustomers.stream().filter { customerContabilF: CustomerContabil ->
                    customerContabilF.composicaoLancamentosContabeis
                        .balancete!!.classificacao == TypeCount.PASSIVO
                }
                    .collect(Collectors.toList())
            }
            updateDownloadLink(crud, customerService, downloadLink)
            customerContabil
        }
        crud.setUpdateOperation { customerContabil: CustomerContabil ->
            customerService.update(customerContabil)
            updateDownloadLink(crud, customerService, downloadLink)
            customerContabil
        }

        downloadLink = generateExcelDownloadLink(excelStreamResource)
        add(balancetePicker, downloadLink, crud)
    }

    private fun exportToExcel(itemList: List<CustomerContabil>): ByteArrayInputStream {
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
            "composicaoData",
            "composicaoDebito",
            "composicaoCredito",
            "composicaoHistorico"
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
            row.createCell(7).setCellValue(item.getStatus())
            row.createCell(8).setCellValue(item.composicaoData)
            row.createCell(9).setCellValue(item.composicaoDebito)
            row.createCell(10).setCellValue(item.composicaoCredito)
            row.createCell(11).setCellValue(item.composicaoHistorico)
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
        crud: GridCrud<CustomerContabil>,
        customerService: CustomerContabilService,
        downloadLink: Anchor
    ) {
        val updatedContabilCustomers = customerService.findByBalanceteID(balanceteID)
        isf = InputStreamFactory {
            exportToExcel(
                updatedContabilCustomers.stream().filter { customerContabilF: CustomerContabil ->
                    customerContabilF.composicaoLancamentosContabeis
                        .balancete!!.classificacao == TypeCount.PASSIVO
                }
                    .collect(Collectors.toList())
            )
        }
        crud.refreshGrid()
        excelStreamResource = StreamResource("fornecedores.xlsx", isf)
        downloadLink.setHref(excelStreamResource)
    }

    companion object {
        private val customerContabilDefaultCrudFormFactory: DefaultCrudFormFactory<CustomerContabil>
            get() {
                val formFactory = DefaultCrudFormFactory(
                    CustomerContabil::class.java
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
                    "composicaoData",
                    "composicaoDebito",
                    "composicaoCredito",
                    "composicaoHistorico"
                )
                return formFactory
            }
    }
}
