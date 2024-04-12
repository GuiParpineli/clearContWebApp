package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.login.LoginForm
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import jakarta.annotation.security.PermitAll

@Route(value = "perfil", layout = MainLayout::class)
@PageTitle("Perfil")
@PermitAll
class PerfilView : Div() {
    init {
        val div = Div(LoginForm())
        val horizontalLayout = HorizontalLayout(div)
        horizontalLayout.alignItems = FlexComponent.Alignment.CENTER
        horizontalLayout.justifyContentMode = FlexComponent.JustifyContentMode.CENTER
        add(horizontalLayout)
    }
}
