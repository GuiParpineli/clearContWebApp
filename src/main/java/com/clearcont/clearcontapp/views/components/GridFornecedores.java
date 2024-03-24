package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.helpers.DownloadExcel;
import com.clearcont.clearcontapp.model.*;
import com.clearcont.clearcontapp.service.CustomerContabilService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.server.InputStreamFactory;
import com.vaadin.flow.server.StreamResource;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jetbrains.annotations.NotNull;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Transactional
@Slf4j
public class GridFornecedores extends VerticalLayout {
    private long balanceteID = 0;
    private InputStreamFactory isf;
    Anchor downloadLink = new Anchor();
    StreamResource excelStreamResource = new StreamResource("fornecedores.xlsx", isf);

    public GridFornecedores(@NotNull CustomerContabilService customerService, List<Balancete> balancetes, Responsavel responsavel, int month) {
        GridCrud<CustomerContabil> crud = new GridCrud<>(CustomerContabil.class);
        DefaultCrudFormFactory<CustomerContabil> formFactory = getCustomerContabilDefaultCrudFormFactory();
        ComboBox<Balancete> balancetePicker = new ComboBox<>();
        crud.setVisible(balancetePicker.getValue() != null);
        balancetePicker.setItems(balancetes);
        balancetePicker.setItemLabelGenerator(Balancete::getNomeConta);
        balancetePicker.addValueChangeListener(event -> {
            Balancete selectedBalancete = event.getValue();
            crud.setVisible(selectedBalancete.getId() != null);
        });

        if (balancetes == null || balancetes.isEmpty()) {
            crud.getGrid().setEnabled(false);
        }

        List<CustomerContabil> contabilCustomers = customerService.findByBalanceteID(balanceteID);
        balancetePicker.addValueChangeListener(event -> {
            Balancete selectedBalancete = event.getValue();
            if (selectedBalancete != null) {
                balanceteID = selectedBalancete.getId();
                List<CustomerContabil> updatedContabilCustomers = customerService.findByBalanceteID(balanceteID);
                crud.setFindAllOperation(() ->
                        updatedContabilCustomers.stream().filter(
                                customerContabil -> customerContabil.getComposicaoLancamentosContabeis()
                                        .getBalancete().getClassificacao().equals(TypeCount.PASSIVO)).toList());
                isf = () -> exportToExcel(
                        updatedContabilCustomers.stream().filter(
                                        customerContabilF ->
                                                customerContabilF.getComposicaoLancamentosContabeis()
                                                        .getBalancete().getClassificacao().equals(TypeCount.PASSIVO))
                                .collect(Collectors.toList())
                );
                updateDownloadLink(crud, customerService, downloadLink);
                crud.refreshGrid();
            }
        });
        formFactory.setFieldCreationListener("data", field -> {
            DatePicker datePicker = (DatePicker) field;
            datePicker.setLocale(Locale.of("pt", "BR"));
            datePicker.addValueChangeListener(event -> {
                LocalDate selectedDate = event.getValue();
                selectedDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            });
        });
        crud.setCrudFormFactory(formFactory);
        crud.getGrid().setColumns(
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
        );
        crud.getGrid().addColumn(customer -> customer.getDiasVencidos(month)).setHeader("Dias Vencidos");

        crud.setFindAllOperation(() -> contabilCustomers.stream().filter(
                customerContabil -> customerContabil.getComposicaoLancamentosContabeis()
                        .getBalancete().getClassificacao().equals(TypeCount.PASSIVO)).toList());

        crud.setAddOperation(
                customerContabil -> {
                    ComposicaoLancamentosContabeis composicao = new ComposicaoLancamentosContabeis();
                    customerContabil.setComposicaoLancamentosContabeis(composicao);
                    customerContabil.getComposicaoLancamentosContabeis().setBalancete(balancetePicker.getValue());
                    customerContabil.getComposicaoLancamentosContabeis().getBalancete().setClassificacao(TypeCount.PASSIVO);
                    customerContabil.getComposicaoLancamentosContabeis().setResponsavel(responsavel);
                    composicao.setCustomerContabil(customerContabil);
                    customerService.save(customerContabil);

                    List<CustomerContabil> updatedContabilCustomers = customerService.findByBalanceteID(balanceteID);
                    crud.setFindAllOperation(() ->
                            updatedContabilCustomers.stream().filter(
                                            customerContabilF ->
                                                    customerContabilF.getComposicaoLancamentosContabeis()
                                                            .getBalancete().getClassificacao().equals(TypeCount.PASSIVO))
                                    .collect(Collectors.toList()));
                    updateDownloadLink(crud, customerService, downloadLink);
                    return customerContabil;
                }
        );
        crud.setUpdateOperation(
                customerContabil -> {
                    customerService.update(customerContabil);
                    updateDownloadLink(crud, customerService, downloadLink);
                    return customerContabil;
                });

        downloadLink = DownloadExcel.generateExcelDownloadLink(excelStreamResource);
        add(balancetePicker, downloadLink, crud);
    }

    private static @NotNull DefaultCrudFormFactory<CustomerContabil> getCustomerContabilDefaultCrudFormFactory() {
        DefaultCrudFormFactory<CustomerContabil> formFactory = new DefaultCrudFormFactory<>(CustomerContabil.class);
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
        );
        return formFactory;
    }

    private ByteArrayInputStream exportToExcel(List<CustomerContabil> itemList) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        String[] headers = {
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
        };

        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
        }

        int rowIndex = 1;
        for (CustomerContabil item : itemList) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(item.getNumNotaFiscal());
            row.createCell(1).setCellValue(item.getDataVencimento());
            row.createCell(2).setCellValue(item.getISS());
            row.createCell(3).setCellValue(item.getINSS());
            row.createCell(4).setCellValue(item.getIRRF());
            row.createCell(5).setCellValue(item.getCSRF());
            row.createCell(6).setCellValue(item.getDiasVencidos());
            row.createCell(7).setCellValue(item.getStatus());
            row.createCell(8).setCellValue(item.getComposicaoData());
            row.createCell(9).setCellValue(item.getComposicaoDebito());
            row.createCell(10).setCellValue(item.getComposicaoCredito());
            row.createCell(11).setCellValue(item.getComposicaoHistorico());
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

    private void updateDownloadLink(GridCrud<CustomerContabil> crud, CustomerContabilService customerService, Anchor downloadLink) {
        List<CustomerContabil> updatedContabilCustomers = customerService.findByBalanceteID(balanceteID);
        isf = () -> exportToExcel(
                updatedContabilCustomers.stream().filter(
                                customerContabilF ->
                                        customerContabilF.getComposicaoLancamentosContabeis()
                                                .getBalancete().getClassificacao().equals(TypeCount.PASSIVO))
                        .collect(Collectors.toList())
        );
        crud.refreshGrid();
        excelStreamResource = new StreamResource("fornecedores.xlsx", isf);
        downloadLink.setHref(excelStreamResource);
    }
}
