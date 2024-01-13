package com.clearcont.clearcontapp;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@Theme(variant = Lumo.LIGHT, themeClass = Lumo.class)
@PWA(
        name = "ClearCont",
        shortName = "CC",
        offlinePath = "offline.html",
        offlineResources = {"images/logo-clear-black.png"}
)
@SpringBootApplication
public class ClearContAppApplication implements AppShellConfigurator {
    
    public static void main(String[] args) {
        SpringApplication.run(ClearContAppApplication.class);
    }
    
}
