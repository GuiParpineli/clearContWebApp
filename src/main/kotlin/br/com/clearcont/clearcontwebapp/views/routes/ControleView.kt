package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.helpers.generateExcelDownloadLink
import br.com.clearcont.clearcontwebapp.models.Controle
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.service.ControleService
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.grid.Grid
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.function.ValueProvider
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.InputStreamFactory
import com.vaadin.flow.server.StreamResource
import jakarta.annotation.security.PermitAll
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.time.LocalDate
import java.util.logging.Logger

@Route(value = "controle", layout = MainLayout::class)
@PageTitle("Controle")
@PermitAll
class ControleView(service: ControleService, empresaRepository: EmpresaRepository?) : Div(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    var log: Logger = Logger.getLogger(javaClass.name)

    init {
        this.getCompany(empresaRepository!!) { empresa: Empresa? ->
            getMonth { month: String? ->
                verifySelectedCompanyAndMonthExistAndNavigate(empresa, month)
                val year = LocalDate.now().year
                val controleList = service.getAllByMonthAndCompanyID(empresa!!.id!!, month!!, year)

                val grid = Grid(Controle::class.java, false).apply {
                    addColumn(Controle::nomeConta).setHeader("Nome da conta").setSortable(true)
                    addColumn({ it.getSaldoBalancete() }).setHeader("Saldo Balancete")
                    addColumn({ it.getSaldoAnalise() }).setHeader("Saldo Analise")
                    addColumn({ it.getValorDiferenca() }).setHeader("Valor da Diferença")
                    addColumn(Controle::nomeResponsavel).setHeader("Responsável")
                    setItems(controleList)
                }

                val isf = InputStreamFactory { exportToExcel(controleList) }
                val excelStreamResource = StreamResource("controle.xlsx", isf)
                val downloadLink = generateExcelDownloadLink(excelStreamResource)

                add(VerticalLayout(FlexComponent.Alignment.START, Div(H1("Controle")), downloadLink, grid))
            }
        }
    }

    private fun exportToExcel(itemList: List<Controle>): ByteArrayInputStream {
        val workbook: Workbook = XSSFWorkbook()
        val sheet = workbook.createSheet("Data")

        val headers = arrayOf("Nome da conta", "Saldo Balancete", "Saldo Analise", "Valor da Diferença", "Responsável")

        val headerRow = sheet.createRow(0)
        for (i in headers.indices) {
            val headerCell = headerRow.createCell(i)
            headerCell.setCellValue(headers[i])
        }

        var rowIndex = 1
        for (item in itemList) {
            val row = sheet.createRow(rowIndex++)

            row.createCell(0).setCellValue(item.nomeConta)
            row.createCell(1).setCellValue(item.getSaldoBalancete())
            row.createCell(2).setCellValue(item.getSaldoAnalise())
            row.createCell(3).setCellValue(item.getValorDiferenca())
            row.createCell(4).setCellValue(item.nomeResponsavel)
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

    private fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?, month: String?) {
        if (empresa == null || month == null || empresa.nomeEmpresa == null) {
            Notification.show("Selecione uma empresa e periodo")
            UI.getCurrent().navigate("/")
        }
    }
}
