package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.views.components.GridCustomer;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;


@Route(value = "clientes", layout = MainLayout.class)
@PageTitle("Clientes| ClearCont App")
@RolesAllowed("ADMIN")
@Getter
@Setter
@Slf4j
public class CustomersView extends FlexLayout implements MonthAndCompany {
    private String month;
    private Empresa empresa;

    public CustomersView(CustomerContabilRepository customerContabilRepository, EmpresaRepository empresaRepository) {
        initializeView(customerContabilRepository, empresaRepository);
    }

    private void initializeView(CustomerContabilRepository customerContabilRepository, EmpresaRepository empresaRepository){
        getCompany(empresaRepository, empresa -> {
            log.info("Empresa selecionada: " + empresa.getNomeEmpresa());
            GridCustomer gridCustomer = new GridCustomer(customerContabilRepository, empresa.getId());
            H1 clientes = new H1("Clientes");
            add(
                            new VerticalLayout(
                                    clientes,
                                    gridCustomer
                            ));
                }
        );
    }
}