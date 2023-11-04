package com.clearcont.clearcontapp.views.main;

import com.clearcont.clearcontapp.views.routes.*;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.icon.Icon;
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
        Image logo = new Image("./images/logo-white-header.png", "Logo");
        H3 logoName = new H3("ClearCont");
        logoName.addClassName("text-header-white");

        logo.setMaxHeight("30px");
        logo.setMaxWidth("65px");
        Div container = new Div(new HorizontalLayout(logo, logoName));

        RouterLink routerLink = new RouterLink();
        routerLink.add(container);
        routerLink.setRoute(HomeView.class);

        RouterLink perfil = new RouterLink("Perfil", PerfilView.class);
        perfil.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .setColor("white").set("text-weight", "bold");
        perfil.getStyle().set("padding-right", "10px");

        HorizontalLayout header = new HorizontalLayout(container, perfil);
        header.expand(container);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.setWidth("100%");
        header.setPadding(true);
        header.setSpacing(true);

        addToNavbar(new DrawerToggle(), header);
    }

    private void createDrawer() {
        addToDrawer(new VerticalLayout(createHorizontalLayout("Home", HomeView.class, "home"),
                createHorizontalLayout("Balance", BalanceteView.class, "scale-unbalance"),
                createHorizontalLayout("Controle", ControleView.class, "shield"),
                createHorizontalLayout("Dashboard", DashboardView.class, "dashboard"),
                createHorizontalLayout("Clientes", ClientesLink.class, "building")));
    }

    private HorizontalLayout createHorizontalLayout(String linkText, Class<? extends Component> viewClass, String iconName) {
        RouterLink link = new RouterLink(linkText, viewClass);
        link.addClassName("drawer-link");
        Icon icon = new Icon(iconName);
        icon.setSize(".9em");
        return new HorizontalLayout(FlexComponent.Alignment.BASELINE, icon, link);
    }
}



