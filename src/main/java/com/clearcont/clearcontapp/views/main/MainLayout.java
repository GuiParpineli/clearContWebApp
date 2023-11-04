package com.clearcont.clearcontapp.views.main;

import com.clearcont.clearcontapp.views.routes.*;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLink;

@CssImport("../frontend/themes/theme-light/styles.css")
public class MainLayout extends AppLayout {

    public MainLayout() {
        createHeader();
        createDrawer();
    }

    private void createHeader() {
        H1 logo = new H1("Logo");
        logo.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("color", "white");
        logo.addClassName("logo");

        RouterLink perfil = new RouterLink("Perfil", PerfilView.class);
        perfil.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("color", "white");

        HorizontalLayout header = new HorizontalLayout(logo, perfil);
        header.expand(logo);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.setWidth("100%");
        header.setPadding(true);
        header.setSpacing(true);

        addToNavbar(new DrawerToggle(), header);
    }

    private void createDrawer() {

        RouterLink balanceteLink = new RouterLink("Balance", BalanceteView.class);
        RouterLink controleLink = new RouterLink("Controle", ControleView.class);
        RouterLink dashboardLink = new RouterLink("Dashboard", DashboardView.class);
        dashboardLink.setHighlightCondition(HighlightConditions.sameLocation());
        RouterLink clientesLink = new RouterLink("Clientes", ClientesLink.class);

        addToDrawer(new VerticalLayout(balanceteLink, controleLink, dashboardLink, clientesLink));
    }
}



