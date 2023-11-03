package com.clearcont.clearcontapp.views.main;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.theme.material.Material;

@PageTitle("Main")
@Route(value = "")
@CssImport("../frontend/themes/theme-light/styles.css")
public class MainView extends AppLayout {

    public MainView() {
        H1 title = new H1("ClearCont");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("position", "absolute").set("color", "white");

        Tab perfil = new Tab(createTabWithIcon("nurse","Perfil"));
        Tabs tabs = getTabs();

        addToNavbar(title, tabs, perfil);
        this.getElement().getClassList().add("my-navbar");
    }

    private Tabs getTabs() {
        Tabs tabs = new Tabs();
        tabs.getStyle().set("margin", "auto");
        tabs.add(createTabWithIcon("home", "Home"),
                createTabWithIcon("scale-unbalance", "Balancete"),
                createTabWithIcon("shield", "Controle"),
                createTabWithIcon("dashboard", "Dashboard"),
                createTabWithIcon("user", "Clientes"),
                createTabWithIcon("building", "Fornecedores"));
        return tabs;
    }

    private Tab createTabWithIcon(String iconName, String tabName) {
        Icon icon = new Icon("vaadin", iconName);
        icon.setSize("0.9em");
        Span span = new Span(tabName);
        return new Tab(new HorizontalLayout(FlexComponent.Alignment.BASELINE, icon, span));
    }

    private Tab createTab(String viewName) {
        RouterLink link = new RouterLink();
        link.add(viewName);
        link.addClassNames("my-custom-tab");
        // Demo has no routes
        // link.setRoute(viewClass.java);
        link.setTabIndex(-1);

        return new Tab(link);
    }

}


