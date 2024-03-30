package br.com.clearcont.clearcontwebapp

import com.vaadin.flow.component.page.AppShellConfigurator
import com.vaadin.flow.server.PWA
import com.vaadin.flow.theme.Theme
import com.vaadin.flow.theme.lumo.Lumo
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@Theme(variant = Lumo.LIGHT, value = "theme-light")
@PWA(
    name = "ClearCont",
    shortName = "CC",
    offlinePath = "offline.html",
    offlineResources = ["images/logo-clear-black.png"]
)
class ClearContWebAppKtApplication : AppShellConfigurator

fun main(args: Array<String>) {
    runApplication<ClearContWebAppKtApplication>(*args)
}
