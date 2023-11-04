package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;


@Route(value = "", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
public class HomeRouteView extends Div {
    public HomeRouteView() {
        add(new H1("Welcome to the home page!"));
    }
}

