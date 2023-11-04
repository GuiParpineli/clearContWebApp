package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "clientes", layout = MainLayout.class)
@PageTitle("clientes| ClearCont App")
public class ClientesLink extends Div {
    public ClientesLink() {
        add(new H1("Hello clientes"));
    }
}
