package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.CookieFactory
import br.com.clearcont.clearcontwebapp.service.UserAppService
import com.vaadin.flow.component.dependency.CssImport
import com.vaadin.flow.component.html.Image
import com.vaadin.flow.component.login.LoginForm
import com.vaadin.flow.component.login.LoginI18n
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.BeforeEnterEvent
import com.vaadin.flow.router.BeforeEnterObserver
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.server.VaadinResponse

@CssImport("./styles/login-view.css")
@Route(value = "/login")
@PageTitle("Login")
class LoginView(service: UserAppService) : VerticalLayout(), BeforeEnterObserver {

    private val login = LoginForm()

    init {
        setSizeFull()
        justifyContentMode = FlexComponent.JustifyContentMode.CENTER
        alignItems = FlexComponent.Alignment.CENTER

        login.action = "login"
        login.onEnabledStateChanged(true)

        val i18n = LoginI18n.createDefault().apply {
            header = LoginI18n.Header()
            header.title = "Faça Login para acessar a aplicação"
            header.description = "Login utilizando usuario e senha"
            additionalInformation = null
            errorMessage.title = "Usuario ou senha incorretos"
            errorMessage.message = "Por favor, tente novamente"
        }

        login.setI18n(i18n)
        login.isForgotPasswordButtonVisible = false
        login.addLoginListener { e ->
            val user = service.getUserByUserName(e.username)
            if (user != null) {
                val cookieFactory = CookieFactory(VaadinResponse.getCurrent())
                cookieFactory.setCookie("company-group-id", user.empresaGroup.id.toString())
                cookieFactory.setCookie("username", e.username)
                cookieFactory.setCookie("responsavel-id", user.responsavel?.id.toString())
            } else {
                Notification.show("Senha incorreta", 2000, Notification.Position.MIDDLE)
            }
        }
        val logo = Image("./images/logo-clear-black.png", "Logo").apply {
            maxWidth = "450px"
            maxHeight = "100px"
            style.setPadding("10px")
        }

        val content = HorizontalLayout().apply {
            addClassName("login-content")
            justifyContentMode = FlexComponent.JustifyContentMode.CENTER
            alignItems = FlexComponent.Alignment.CENTER
            add(logo, login)
        }
        val layout = HorizontalLayout().apply {
            justifyContentMode = FlexComponent.JustifyContentMode.CENTER
            alignItems = FlexComponent.Alignment.CENTER
            isPadding = true
            add(content)
        }
        style.setBackground("linear-gradient(to right, #48a95b, #023a0f)")
        add(layout)
    }

    override fun beforeEnter(beforeEnterEvent: BeforeEnterEvent) {
        if (beforeEnterEvent.location.queryParameters.parameters.containsKey("error")) {
            login.isError = true
        }
    }

}
