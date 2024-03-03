package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.model.CustomerContabil;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.jetbrains.annotations.NotNull;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

public class GridCustomer extends VerticalLayout {
    public GridCustomer(@NotNull CustomerContabilRepository repository, Long empresaID) {
        GridCrud<CustomerContabil> crud = new GridCrud<>(CustomerContabil.class);

        DefaultCrudFormFactory<CustomerContabil> formFactory = getCustomerContabilDefaultCrudFormFactory();

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
                "composicaoLancamentosContabeis.data",
                "composicaoLancamentosContabeis.debito",
                "composicaoLancamentosContabeis.credito",
                "composicaoLancamentosContabeis.historico"
        );
        crud.setFindAllOperation(() -> repository.findAllByComposicaoLancamentosContabeis_Balancete_Empresa_Id(empresaID));
        add(crud);
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
                "composicaoLancamentosContabeis.data",
                "composicaoLancamentosContabeis.debito",
                "composicaoLancamentosContabeis.credito",
                "composicaoLancamentosContabeis.historico"
        );
        return formFactory;
    }
}