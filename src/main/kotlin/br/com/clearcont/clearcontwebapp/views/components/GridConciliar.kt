package br.com.clearcont.clearcontwebapp.views.components

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.models.*
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.views.components.details.BalanceteDetailsLayout
import com.vaadin.flow.component.HasValue
import com.vaadin.flow.component.datepicker.DatePicker
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.server.VaadinResponse
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.vaadin.crudui.crud.impl.GridCrud
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.IOException
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

    init {
        val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
        val crud = GridCrud(ComposicaoLancamentosContabeisDTO::class.java)
        val formFactory = DefaultCrudFormFactory(ComposicaoLancamentosContabeisDTO::class.java)
        val formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))

        formFactory.setVisibleProperties("data", "debito", "credito", "historico")

        formFactory.setFieldCreationListener("data") { field: HasValue<*, *> ->
            val datePicker = field as DatePicker
            datePicker.locale = Locale.of("pt", "BR")
            datePicker.addValueChangeListener { event ->
                val selectedDate = event.value
                selectedDate.format(formatador)
            }
        }

        crud.crudFormFactory = formFactory
        crud.grid.setColumns("debito", "credito", "saldoContabil", "historico")
        crud.grid.addColumn(ComposicaoLancamentosContabeisDTO::dataFormated).setHeader("Data")
        crud.grid.setColumnOrder(
            crud.grid.columns[4],
            crud.grid.getColumnByKey("debito"),
            crud.grid.getColumnByKey("credito"),
            crud.grid.getColumnByKey("saldoContabil"),
            crud.grid.getColumnByKey("historico")
        )

        crud.setAddOperation { lancamentosContabeis ->
            lancamentosContabeis.balancete = balancete
            val responsavelID = cookieFactory.getCookieInteger("responsavel-id")
            lancamentosContabeis.responsavel = responsavelRepository.findById(responsavelID).orElseThrow()
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.getTotalBalanceteDouble(),
                contabeisService.getSaldoContabil(balanceteId)
            )
            contabeisService.save(lancamentosContabeis.toEntity())
            lancamentosContabeis
        }
        crud.setFindAllOperation {
            val all = contabeisService.getByBalanceteID(balanceteId).map { it.toDTO() }.toList()
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.getTotalBalanceteDouble(),
                contabeisService.getSaldoContabil(balanceteId)
            )
            all
        }
        crud.setDeleteOperation { lancamentosContabeis ->
            contabeisService.deleteByID(lancamentosContabeis.id!!)
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.getTotalBalanceteDouble(),
                contabeisService.getSaldoContabil(balanceteId)
            )
        }
        crud.setUpdateOperation { a: ComposicaoLancamentosContabeisDTO ->
            contabeisService.update(a.toEntity())
            contabeisService.atualizarSaldoContabil(balanceteId, crud)
            infoCards.updateDiferencaLayout(
                balancete.getTotalBalanceteDouble(),
                contabeisService.getSaldoContabil(balanceteId)
            )
            a
        }

        add(crud)
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
