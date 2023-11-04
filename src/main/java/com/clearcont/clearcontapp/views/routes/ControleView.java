package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("controle | ClearCont App")
public class ControleView extends Div {
    public ControleView() {
        add(new H1("Hello controle"));
    }
}
