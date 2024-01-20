package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.User;
import com.clearcont.clearcontapp.service.UserAppService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.login.LoginI18n;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import org.springframework.security.core.userdetails.UserDetails;


@Route(value = "login", layout = MainLayout.class)
@PageTitle("Login")
public class LoginView extends LoginOverlay {
    
    public LoginView(UserAppService service) {
        setAction("login");
        
        LoginI18n i18n = LoginI18n.createDefault();
        i18n.setHeader(new LoginI18n.Header());
        i18n.getHeader().setTitle("Faça Login para acessar a aplicação");
        i18n.getHeader().setDescription("Login utilizando usuario e senha");
        i18n.setAdditionalInformation(null);
        setI18n(i18n);
        
        setForgotPasswordButtonVisible(false);
        setOpened(true);
        
        addLoginListener(e -> {
            User user = service.getUserByUserName(e.getUsername());
            if (user != null) {
                CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
                cookieFactory.setCookie("company-group-id", user.getEmpresaGroup().getId().toString());
                cookieFactory.setCookie("username", e.getUsername());
            }
        });
    }
}
