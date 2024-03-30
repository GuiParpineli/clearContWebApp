package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.service.UserAppService
import br.com.clearcont.clearcontwebapp.views.MainLayout
import com.vaadin.flow.component.login.LoginI18n
import com.vaadin.flow.component.login.LoginOverlay
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse

@Route(value = "/login", layout = MainLayout::class)
@PageTitle("Login")
class LoginView(service: UserAppService) : LoginOverlay() {
    init {
        action = "login"

        val i18n = LoginI18n.createDefault()
        i18n.header = LoginI18n.Header()
        i18n.header.title = "Faça Login para acessar a aplicação"
        i18n.header.description = "Login utilizando usuario e senha"
        i18n.additionalInformation = null
        setI18n(i18n)

        isForgotPasswordButtonVisible = false
        isOpened = true

        addLoginListener { e: LoginEvent ->
            val user = service.getUserByUserName(e.username)
            if (user != null) {
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                cookieFactory.setCookie("company-group-id", user.empresaGroup.id.toString())
                cookieFactory.setCookie("username", e.username)
                cookieFactory.setCookie("responsavel-id", user.responsavel?.id.toString())
            }
        }
    }
}
