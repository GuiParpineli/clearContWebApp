package com.clearcont.clearcontapp.views.main;

import com.clearcont.clearcontapp.model.Role;
import com.clearcont.clearcontapp.security.AuthenticatedUser;
import com.clearcont.clearcontapp.views.routes.*;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.router.RouterLink;
import lombok.Getter;
import lombok.Setter;

@CssImport("../frontend/themes/theme-light/styles.css")
@Setter
@Getter
public class MainLayout extends AppLayout {
    private final AuthenticatedUser authenticatedUser;
    
    public MainLayout(AuthenticatedUser authenticatedUser) {
        this.authenticatedUser = authenticatedUser;
        createHeader();
        createDrawer();
        if (authenticatedUser.get().isPresent() && authenticatedUser.get().get().getRoles().contains(Role.ADMIN))
            addToDrawer(
                    new VerticalLayout(
                            createHorizontalLayout("Dashboard", DashboardView.class, "dashboard"),
                            createHorizontalLayout("Clientes", CustomersView.class, "building"))
            );
    }
    
    private void createHeader() {
        Image logo = new Image("./images/logo-white.png", "Logo");
        logo.setMaxHeight("35px");
        
        RouterLink routerLink = new RouterLink("", HomeView.class);
        routerLink.add(logo);
        
        Div container = new Div(routerLink);
        
        Button logoutButton = new Button("Logout");
        logoutButton.getStyle().setMargin("10px").setColor("white");
        logoutButton.addClickListener(e -> {
            UI ui = UI.getCurrent();
            Page page = ui.getPage();
            page.executeJs("return localStorage.clear()");
            page.executeJs("return sessionStorage.clear()");
            authenticatedUser.logout();
        });
        
        HorizontalLayout header = new HorizontalLayout(container, logoutButton);
        header.expand(container);
        header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        header.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
        header.setWidth("100%");
        header.setSpacing(true);
        
        addToNavbar(new DrawerToggle(), header);
        
    }
    
    private void createDrawer() {
        addToDrawer(new VerticalLayout(createHorizontalLayout("Home", HomeView.class, "home"),
                createHorizontalLayout("Balancete", BalanceteView.class, "scale-unbalance"),
                createHorizontalLayout("Controle", ControleView.class, "shield")));
    }
    
    private HorizontalLayout createHorizontalLayout(String linkText, Class<? extends Component> viewClass, String iconName) {
        RouterLink link = new RouterLink(linkText, viewClass);
        link.addClassName("drawer-link");
        Icon icon = new Icon(iconName);
        icon.setSize(".9em");
        return new HorizontalLayout(FlexComponent.Alignment.BASELINE, icon, link);
    }
}