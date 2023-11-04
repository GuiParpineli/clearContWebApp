package com.clearcont.clearcontapp.views.main;

import com.clearcont.clearcontapp.views.routes.*;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
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
        Image logo = new Image("./images/logo-white.png", "Logo");
        Div container = new Div(logo);
        logo.setMaxHeight("50px");
        logo.setMaxWidth("85px");

        RouterLink routerLink = new RouterLink();
        routerLink.add(container);
        routerLink.setRoute(HomeView.class);

        RouterLink perfil = new RouterLink("Perfil", PerfilView.class);
        perfil.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("color", "white");

        HorizontalLayout header = new HorizontalLayout(container, perfil);
        header.expand(container);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.setWidth("100%");
        header.setPadding(true);
        header.setSpacing(true);

        addToNavbar(new DrawerToggle(), header);
    }

    private void createDrawer() {

        RouterLink homeLink = new RouterLink("Home", HomeView.class);
        RouterLink balanceteLink = new RouterLink("Balance", BalanceteView.class);
        RouterLink controleLink = new RouterLink("Controle", ControleView.class);
        RouterLink dashboardLink = new RouterLink("Dashboard", DashboardView.class);
        dashboardLink.setHighlightCondition(HighlightConditions.sameLocation());
        RouterLink clientesLink = new RouterLink("Clientes", ClientesLink.class);

        addToDrawer(new VerticalLayout(homeLink, balanceteLink, controleLink, dashboardLink, clientesLink));
    }
}



