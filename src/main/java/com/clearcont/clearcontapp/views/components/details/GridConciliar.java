package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.helpers.PerfilData;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.ComposicaoLanContabeisService;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class GridConciliar extends VerticalLayout {
    
    public GridConciliar(Balancete balancete, ComposicaoLanContabeisService contabeisService, Integer balanceteId, ResponsavelRepository responsavelRepository) {
        
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
                String dataFormatada = selectedDate.format(formatador);
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
            a.setResponsavel(responsavelRepository.findById(PerfilData.responsavelID).orElseThrow());
            contabeisService.save(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            return a;
        });
        crud.setFindAllOperation(() -> {
                    var all = contabeisService.getByBalanceteID(balanceteId);
                    contabeisService.atualizarSaldoContabil(balanceteId, crud);
                    return all;
                }
        );
        crud.setDeleteOperation(a -> {
            contabeisService.deleteByID(a.getId());
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
        });
        crud.setUpdateOperation(a -> {
            contabeisService.update(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            return a;
        });
        
        add(crud);
    }
}