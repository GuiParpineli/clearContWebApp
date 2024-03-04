package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.CustomerContabil;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
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

@Transactional
public class GridCustomer extends VerticalLayout {
    private long balanceteID = 0;

    public GridCustomer(@NotNull CustomerContabilRepository repository, List<Balancete> balancetes) {
        GridCrud<CustomerContabil> crud = new GridCrud<>(CustomerContabil.class);
        DefaultCrudFormFactory<CustomerContabil> formFactory = getCustomerContabilDefaultCrudFormFactory();
        ComboBox<Balancete> balancetePicker = new ComboBox<>();
        balancetePicker.setItems(balancetes);
        balancetePicker.setItemLabelGenerator(Balancete::getNomeConta);

        List<CustomerContabil> contabilCustomers = repository.findAllByComposicaoLancamentosContabeis_Balancete_Id(balanceteID);
        balancetePicker.addValueChangeListener(event -> {
            Balancete selectedBalancete = event.getValue();
            if (selectedBalancete != null) {
                balanceteID = selectedBalancete.getId();
                List<CustomerContabil> updatedContabilCustomers = repository.findAllByComposicaoLancamentosContabeis_Balancete_Id(balanceteID);
                crud.setFindAllOperation(() -> updatedContabilCustomers);
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
        crud.setFindAllOperation(() -> contabilCustomers);
        crud.setAddOperation(
                customerContabil -> {
                    if (customerContabil.getComposicaoLancamentosContabeis() == null) {
                        customerContabil.setComposicaoLancamentosContabeis(new ComposicaoLancamentosContabeis());
                    }

                    customerContabil.getComposicaoLancamentosContabeis().setBalancete(balancetePicker.getValue());
                    repository.save(customerContabil);
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