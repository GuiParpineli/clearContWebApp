package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.DownloadExcel;
import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.components.TopBarControleView;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.InputStreamFactory;
import com.vaadin.flow.server.StreamResource;
import jakarta.annotation.security.PermitAll;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jetbrains.annotations.NotNull;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("Controle")
@PermitAll
@Setter
@Getter
@Slf4j
public class ControleView extends Div implements MonthAndCompany {
    String month;
    Empresa empresa;

    public ControleView(@NotNull ControleService service, EmpresaRepository empresaRepository) {
        getCompany(empresaRepository, empresa -> getMonth(month -> {
            int year = LocalDate.now().getYear();
            List<Controle> controleList = service.getAllByMonthAndCompanyID(empresa.getId(), month, year);
            Grid<Controle> grid = new Grid<>(Controle.class, false);
            grid.addColumn(Controle::getNomeConta).setHeader("Nome da conta").setSortable(true);
            grid.addColumn(Controle::getSaldoBalancete).setHeader("Saldo Balancete");
            grid.addColumn(Controle::getSaldoAnalise).setHeader("Saldo Analise");
            grid.addColumn(Controle::getValorDiferenca).setHeader("Valor da Diferença");
            grid.addColumn(Controle::getNomeResponsavel).setHeader("Responsável");
            grid.setItems(controleList);

            InputStreamFactory isf = () -> exportToExcel(controleList);
            StreamResource excelStreamResource = new StreamResource("controle.xlsx", isf);
            Anchor downloadLink = DownloadExcel.generateExcelDownloadLink(excelStreamResource);

            add(new VerticalLayout(FlexComponent.Alignment.CENTER, new Div(new H1("Controle")), downloadLink, grid));
        }));
    }

    private ByteArrayInputStream exportToExcel(List<Controle> itemList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        String[] headers = {"Nome da conta", "Saldo Balancete", "Saldo Analise", "Valor da Diferença", "Responsável"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
        }

        int rowIndex = 1;
        for (Controle item : itemList) {
            Row row = sheet.createRow(rowIndex++);

            row.createCell(0).setCellValue(item.getNomeConta());
            row.createCell(1).setCellValue(item.getSaldoBalancete());
            row.createCell(2).setCellValue(item.getSaldoAnalise());
            row.createCell(3).setCellValue(item.getValorDiferenca());
            row.createCell(4).setCellValue(item.getNomeResponsavel());
        }

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            workbook.write(bos);
        } catch (IOException e) {
            log.info(e.getMessage());
        } finally {
            try {
                workbook.close();
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }

        return new ByteArrayInputStream(bos.toByteArray());
    }


}
