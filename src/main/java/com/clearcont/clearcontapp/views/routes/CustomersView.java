package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.clearcont.clearcontapp.views.components.GridCustomer;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@Route(value = "clientes", layout = MainLayout.class)
@PageTitle("clientes| ClearCont App")
@RolesAllowed("ADMIN")
public class CustomersView extends Div {
    public CustomersView(CustomerContabilRepository customerContabilRepository) {
        add(
                new VerticalLayout(
                        new H1("Clientes"),
                        new GridCustomer(customerContabilRepository)
                ));
    }
}