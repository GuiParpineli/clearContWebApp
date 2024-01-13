package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.service.ComposicaoLanContabeisService;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

public class GridConciliar extends VerticalLayout {
    
    public GridConciliar(Balancete balancete, ComposicaoLanContabeisService contabeisService, Integer balanceteId) {
        
        GridCrud<ComposicaoLancamentosContabeis> crud = new GridCrud<>(ComposicaoLancamentosContabeis.class);
        DefaultCrudFormFactory<ComposicaoLancamentosContabeis> formFactory = new DefaultCrudFormFactory<>(ComposicaoLancamentosContabeis.class);
        formFactory.setVisibleProperties("data", "debito", "credito", "historico");
        crud.setCrudFormFactory(formFactory);
        crud.getGrid().
                
                setColumns("data", "debito", "credito", "saldoContabil", "historico");
        crud.setAddOperation(a ->
        
        {
            a.setBalancete(balancete);
            contabeisService.save(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            return a;
        });
        crud.setFindAllOperation(() ->
                
                {
                    var all = contabeisService.getByBalanceteID(balanceteId);
                    contabeisService.atualizarSaldoContabil(balanceteId, crud);
                    return all;
                }
        );
        crud.setDeleteOperation(a ->
        
        {
            contabeisService.delete(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
        });
        crud.setUpdateOperation(a ->
        
        {
            contabeisService.update(a);
            contabeisService.atualizarSaldoContabil(balanceteId, crud);
            return a;
        });
        add(crud);
    }
}
