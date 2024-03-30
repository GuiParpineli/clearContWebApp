package br.com.clearcont.clearcontwebapp.views

import br.com.clearcont.clearcontwebapp.configs.security.AuthenticatedUser
import br.com.clearcont.clearcontwebapp.models.Role
import br.com.clearcont.clearcontwebapp.views.routes.*
import com.vaadin.flow.component.ClickEvent
import com.vaadin.flow.component.Component
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.applayout.AppLayout
import com.vaadin.flow.component.applayout.DrawerToggle
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.dependency.CssImport
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.Image
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.RouterLink


@CssImport("../frontend/themes/theme-light/styles.css")
class MainLayout(private val authenticatedUser: AuthenticatedUser) : AppLayout() {
    init {
        createHeader()
        createDrawer()
        if (authenticatedUser.get().isPresent && authenticatedUser.get().get().getRoles()
                .contains(Role.ADMIN)
        ) addToDrawer(
            VerticalLayout(
                createHorizontalLayout("Dashboard", DashboardView::class.java, "dashboard"),
                createHorizontalLayout("Clientes", CustomersView::class.java, "building"),
                createHorizontalLayout("Fornecedores", FornecedoresView::class.java, "suitcase")
            )
        )
    }

    private fun createHeader() {
        val logo = Image("./images/logo-white.png", "Logo")
        logo.maxHeight = "35px"

        val routerLink = RouterLink("", HomeView::class.java)
        routerLink.add(logo)

        val container = Div(routerLink)

        val logoutButton = Button("Logout")
        logoutButton.style.setMargin("10px").setColor("white")
        logoutButton.addClickListener { e: ClickEvent<Button?>? ->
            val ui = UI.getCurrent()
            val page = ui.page
            page.executeJs("return localStorage.clear()")
            page.executeJs("return sessionStorage.clear()")
            authenticatedUser.logout()
        }

        val header = HorizontalLayout(container, logoutButton)
        header.expand(container)
        header.defaultVerticalComponentAlignment = FlexComponent.Alignment.CENTER
        header.justifyContentMode = FlexComponent.JustifyContentMode.BETWEEN
        header.width = "100%"
        header.isSpacing = true

        addToNavbar(DrawerToggle(), header)
    }

    private fun createDrawer() {
        addToDrawer(
            VerticalLayout(
                createHorizontalLayout("Home", HomeView::class.java, "home"),
                createHorizontalLayout("Balancete", BalanceteView::class.java, "scale-unbalance"),
                createHorizontalLayout("Controle", ControleView::class.java, "shield")
            )
        )
    }

    private fun createHorizontalLayout(
        linkText: String,
        viewClass: Class<out Component?>,
        iconName: String
    ): HorizontalLayout {
        val link = RouterLink(linkText, viewClass)
        link.addClassName("drawer-link")
        val icon = Icon(iconName)
        icon.setSize(".9em")
        return HorizontalLayout(FlexComponent.Alignment.BASELINE, icon, link)
    }
}
