package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

@Route(value = "clientes", layout = MainLayout.class)
@PageTitle("clientes| ClearCont App")
@RolesAllowed("admin")
public class ClientesLink extends Div {
    public ClientesLink() {
        add(new H1("Hello clientes"));
    }
}
