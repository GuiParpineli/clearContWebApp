package com.clearcont.clearcontapp.views.main;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@PageTitle("Main")
@Route(value = "")
@CssImport("../frontend/themes/theme-light/styles.css")
public class MainView extends AppLayout {

    public MainView() {
        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("left", "var(--lumo-space-l)").set("margin", "0")
                .set("position", "absolute").set("color", "white");

        Tabs tabs = getTabs();

        addToNavbar(title, tabs);
        this.getElement().getClassList().add("my-navbar");
    }

    private Tabs getTabs() {
        Tabs tabs = new Tabs();
        tabs.getStyle().set("margin", "auto");
        tabs.add(createTab("Dashboard"), createTab("Orders"),
                createTab("Customers"), createTab("Products"));
        tabs.getStyle().set("color", "white !important");
        return tabs;
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


