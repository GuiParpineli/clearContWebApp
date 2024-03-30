package br.com.clearcont.clearcontwebapp.views.components

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.views.components.details.BalanceteDetailsLayout
import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent
import com.vaadin.flow.component.HasValue
import com.vaadin.flow.component.datepicker.DatePicker
import com.vaadin.flow.component.grid.Grid
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.server.VaadinResponse
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


class GridConciliar(
    balancete: Balancete,
    contabeisService: ComposicaoLancamentosContabeisService,
    balanceteId: Long?,
    responsavelRepository: ResponsavelRepository,
    infoCards: BalanceteDetailsLayout
) : VerticalLayout() {
    var log: Logger = Logger.getLogger(javaClass.name)

    private val crud = GridCrud(
        ComposicaoLancamentosContabeis::class.java
    )

    val grid: Grid<ComposicaoLancamentosContabeis>
        get() = crud.grid

    init {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val crud = GridCrud(
            ComposicaoLancamentosContabeis::class.java
        )
        val formFactory =
            DefaultCrudFormFactory(ComposicaoLancamentosContabeis::class.java)
        val formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))

        formFactory.setVisibleProperties("data", "debito", "credito", "historico")

        formFactory.setFieldCreationListener("data") { field: HasValue<*, *> ->
            val datePicker = field as DatePicker
            datePicker.locale = Locale.of("pt", "BR")
            datePicker.addValueChangeListener { event: ComponentValueChangeEvent<DatePicker?, LocalDate> ->
                val selectedDate = event.value
                selectedDate.format(formatador)
            }
        }

        crud.crudFormFactory = formFactory
        crud.grid.setColumns("debito", "credito", "saldoContabil", "historico")
        crud.grid.addColumn(ComposicaoLancamentosContabeis::dataFormated).setHeader("Data")
        crud.grid.setColumnOrder(
            crud.grid.columns[4],
            crud.grid.getColumnByKey("debito"),
            crud.grid.getColumnByKey("credito"),
            crud.grid.getColumnByKey("saldoContabil"),
            crud.grid.getColumnByKey("historico")
        )

        crud.setAddOperation { a: ComposicaoLancamentosContabeis ->
            a.balancete = balancete
            val responsavelID = cookieFactory.getCookieInteger("responsavel-id")
            a.responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
            contabeisService.saveWithCustomer(a, CustomerContabil())
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.doubleTotalBalancete!!,
                contabeisService.getSaldoContabil(balanceteId)
            )
            a
        }
        crud.setFindAllOperation {
            val all = contabeisService.getByBalanceteID(balanceteId)
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.doubleTotalBalancete!!,
                contabeisService.getSaldoContabil(balanceteId)
            )
            all
        }
        crud.setDeleteOperation { a: ComposicaoLancamentosContabeis ->
            contabeisService.deleteByID(a.id!!)
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.doubleTotalBalancete!!,
                contabeisService.getSaldoContabil(balanceteId)
            )
        }
        crud.setUpdateOperation { a: ComposicaoLancamentosContabeis ->
            contabeisService.update(a)
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.doubleTotalBalancete!!,
                contabeisService.getSaldoContabil(balanceteId)
            )
            a
        }

        add(crud)
    }

    fun exportToExcel(itemList: List<ComposicaoLancamentosContabeis>): ByteArrayInputStream {
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
            row.createCell(1).setCellValue(item.getDebito())
            row.createCell(2).setCellValue(item.getCredito())
            row.createCell(3).setCellValue(item.getSaldoContabil())
            row.createCell(4).setCellValue(item.historico)
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
}
