package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;


@Route(value = "login", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
public class LoginView extends Div {
    public LoginView() {
        add(new LoginForm());
    }
}
