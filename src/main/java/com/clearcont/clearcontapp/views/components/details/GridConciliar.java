package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.CustomerContabil;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.ComposicaoLancamentosContabeisService;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.server.VaadinService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jetbrains.annotations.NotNull;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Slf4j
public class GridConciliar extends VerticalLayout {
    private final GridCrud<ComposicaoLancamentosContabeis> crud = new GridCrud<>(ComposicaoLancamentosContabeis.class);

    public Grid<ComposicaoLancamentosContabeis> getGrid() {
        return this.crud.getGrid();
    }

    public GridConciliar(@NotNull Balancete balancete, @NotNull ComposicaoLancamentosContabeisService contabeisService, Long balanceteId, @NotNull ResponsavelRepository responsavelRepository, @NotNull BalanceteDetailsLayout infoCards) {

        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        GridCrud<ComposicaoLancamentosContabeis> crud = new GridCrud<>(ComposicaoLancamentosContabeis.class);
        DefaultCrudFormFactory<ComposicaoLancamentosContabeis> formFactory =
                new DefaultCrudFormFactory<>(ComposicaoLancamentosContabeis.class);
        var formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"));

        formFactory.setVisibleProperties("data", "debito", "credito", "historico");

        formFactory.setFieldCreationListener("data", field -> {
            DatePicker datePicker = (DatePicker) field;
            datePicker.setLocale(Locale.of("pt", "BR"));
            datePicker.addValueChangeListener(event -> {
                LocalDate selectedDate = event.getValue();
                selectedDate.format(formatador);
            });
        });

        crud.setCrudFormFactory(formFactory);
        crud.getGrid().setColumns("debito", "credito", "saldoContabil", "historico");
        crud.getGrid().addColumn(ComposicaoLancamentosContabeis::getDataFormated).setHeader("Data");
        crud.getGrid().setColumnOrder(
                crud.getGrid().getColumns().get(4),
                crud.getGrid().getColumnByKey("debito"),
                crud.getGrid().getColumnByKey("credito"),
                crud.getGrid().getColumnByKey("saldoContabil"),
                crud.getGrid().getColumnByKey("historico")
        );

        crud.setAddOperation(a -> {
            a.setBalancete(balancete);
            Long responsavelID = cookieFactory.getCookieInteger("responsavel-id");
            a.setResponsavel(responsavelRepository.findById(responsavelID).orElseThrow());
            contabeisService.saveWithCustomer(a, new CustomerContabil());
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            infoCards.updateDiferencaLayout(balancete.getDoubleTotalBalancete(), contabeisService.getSaldoContabil(balanceteId));
            return a;
        });
        crud.setFindAllOperation(() -> {
                    var all = contabeisService.getByBalanceteID(balanceteId);
                    contabeisService.atualizarSaldoContabil(balanceteId, crud);
                    infoCards.updateDiferencaLayout(balancete.getDoubleTotalBalancete(), contabeisService.getSaldoContabil(balanceteId));
                    return all;
                }
        );
        crud.setDeleteOperation(a -> {
            contabeisService.deleteByID(a.getId());
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            infoCards.updateDiferencaLayout(balancete.getDoubleTotalBalancete(), contabeisService.getSaldoContabil(balanceteId));
        });
        crud.setUpdateOperation(a -> {
            contabeisService.update(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            infoCards.updateDiferencaLayout(balancete.getDoubleTotalBalancete(), contabeisService.getSaldoContabil(balanceteId));
            return a;
        });

        add(crud);
    }

    public ByteArrayInputStream exportToExcel(List<ComposicaoLancamentosContabeis> itemList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        String[] headers = {"Data", "Débito", "Crédito", "Saldo Contábil", "Histórico"};

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
        }

        int rowIndex = 1;
        for (ComposicaoLancamentosContabeis item : itemList) {
            Row row = sheet.createRow(rowIndex++);

            row.createCell(0).setCellValue(item.getDataFormated());
            row.createCell(1).setCellValue(item.getDebito());
            row.createCell(2).setCellValue(item.getCredito());
            row.createCell(3).setCellValue(item.getSaldoContabil());
            row.createCell(4).setCellValue(item.getHistorico());
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
