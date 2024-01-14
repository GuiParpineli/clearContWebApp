package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.EmpresaGroup;
import com.clearcont.clearcontapp.model.UserApp;
import com.clearcont.clearcontapp.service.LoginService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;


@Route(value = "login", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
public class LoginView extends Div {
    
    public LoginView(LoginService service) {
        
        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        LoginForm loginForm = new LoginForm();
        loginForm.addLoginListener(
                login -> {
                    UserApp user = service.Login(login.getUsername());
                    
                    cookieFactory.setCookie("company-id", user.getEmpresaGroup().getId().toString());
                    cookieFactory.setCookie("jwt", user.getJwt());
                    cookieFactory.setCookie("responsavel-id", user.getId().toString());
                }
        );
        add(loginForm);
    }
}
