package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.model.*;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.clearcont.clearcontapp.service.CustomerContabilService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Transactional
public class GridFornecedores extends VerticalLayout {
    private long balanceteID = 0;

    public GridFornecedores(@NotNull CustomerContabilService customerService, List<Balancete> balancetes, Responsavel responsavel) {
        GridCrud<CustomerContabil> crud = new GridCrud<>(CustomerContabil.class);
        DefaultCrudFormFactory<CustomerContabil> formFactory = getCustomerContabilDefaultCrudFormFactory();
        ComboBox<Balancete> balancetePicker = new ComboBox<>();
        balancetePicker.setItems(balancetes);
        balancetePicker.setItemLabelGenerator(Balancete::getNomeConta);

        List<CustomerContabil> contabilCustomers = customerService.findByBalanceteID(balanceteID);
        balancetePicker.addValueChangeListener(event -> {
            Balancete selectedBalancete = event.getValue();
            if (selectedBalancete != null) {
                balanceteID = selectedBalancete.getId();
                List<CustomerContabil> updatedContabilCustomers = customerService.findByBalanceteID(balanceteID);
                crud.setFindAllOperation(() ->
                        updatedContabilCustomers.stream().filter(
                                        customerContabil ->
                                                customerContabil.getComposicaoLancamentosContabeis()
                                                        .getBalancete().getClassificacao().equals(TypeCount.PASSIVO))
                                .toList());
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
        crud.setFindAllOperation(() -> contabilCustomers.stream().filter(
                        customerContabil ->
                                customerContabil.getComposicaoLancamentosContabeis()
                                        .getBalancete().getClassificacao().equals(TypeCount.PASSIVO))
                .toList());
        crud.setAddOperation(
                customerContabil -> {
                    ComposicaoLancamentosContabeis composicao;
                    composicao = new ComposicaoLancamentosContabeis();
                    composicao.setCustomerContabil(customerContabil);
                    customerContabil.setComposicaoLancamentosContabeis(composicao);
                    customerContabil.getComposicaoLancamentosContabeis().setBalancete(balancetePicker.getValue());
                    customerContabil.getComposicaoLancamentosContabeis().getBalancete().setClassificacao(TypeCount.PASSIVO);
                    customerContabil.getComposicaoLancamentosContabeis().setResponsavel(responsavel);
                    customerService.save(customerContabil);

                    List<CustomerContabil> updatedContabilCustomers = customerService.findByBalanceteID(balanceteID);
                    crud.setFindAllOperation(() ->
                            updatedContabilCustomers.stream().filter(
                                            customerContabilF ->
                                                    customerContabilF.getComposicaoLancamentosContabeis()
                                                            .getBalancete().getClassificacao().equals(TypeCount.ATIVO))
                                    .collect(Collectors.toList()));
                    crud.refreshGrid();

                    return customerContabil;
                }
        );
        add(balancetePicker, crud);
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
}