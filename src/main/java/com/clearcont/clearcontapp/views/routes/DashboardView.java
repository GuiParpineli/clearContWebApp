package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@Route(value = "dashboard", layout = MainLayout.class)
@PageTitle("Dashboard | Nome do Aplicativo")
public class DashboardView extends VerticalLayout {

    public DashboardView() {
        addClassName("dashboard-view");
        add(new H1("Bem-vindo ao painel!"));
        // Adicione componentes adicionais conforme necessário
    }
}