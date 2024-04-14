package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import jakarta.annotation.security.RolesAllowed

@Route(value = "admin", layout = MainLayout::class)
@PageTitle("ADMIN PANEL")
@RolesAllowed("ADMIN")
class AdminPanelView : Div() {
    init {
        create()
        add(H1("Hello world"))
    }

    fun create(){ }
}
