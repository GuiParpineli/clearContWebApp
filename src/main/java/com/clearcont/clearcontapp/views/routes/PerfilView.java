package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "perfil", layout = MainLayout.class)
@PageTitle("Perfil | ClearCont App")
public class PerfilView extends Div {
    public PerfilView() {
        add(new H1("Perfil"));
    }
}
