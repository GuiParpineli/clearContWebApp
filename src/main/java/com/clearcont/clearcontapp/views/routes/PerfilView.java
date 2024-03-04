package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

@Route(value = "perfil", layout = MainLayout.class)
@PageTitle("Perfil")
@PermitAll
public class PerfilView extends Div {
    public PerfilView() {
        Div div = new Div(new LoginForm());
        HorizontalLayout horizontalLayout = new HorizontalLayout(div);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        horizontalLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);
        add(horizontalLayout);
    }
}