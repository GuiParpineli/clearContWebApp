package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.EmpresaGroup;
import com.clearcont.clearcontapp.service.EmpresaGroupService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Route(value = "", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
@PermitAll
@Slf4j
public class HomeView extends Div {
    String version = "0.2.0-BETA";
    
    private void setComboBoxValues(ComboBox<String> companyPicker, ComboBox<String> monthPicker) {
        UI.getCurrent().getPage().executeJs("return localStorage.getItem('month')")
                .then(String.class, savedMonth -> {
                    if (savedMonth != null && !savedMonth.isEmpty()) {
                        monthPicker.setValue(savedMonth);
                    }
                });
        UI.getCurrent().getPage().executeJs("return localStorage.getItem('company-name')")
                .then(String.class, savedCompanyName -> {
                    if (savedCompanyName != null && !savedCompanyName.isEmpty()) {
                        companyPicker.setValue(savedCompanyName);
                    }
                });
    }
    
    public HomeView(EmpresaGroupService empresaGroupService) {
        
        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        int id = cookieFactory.getCookieInteger("company-group-id");
        EmpresaGroup companyList = empresaGroupService.getByID(id);
        
        
        log.info("ID COMPANY GROUP RETORNADA: " + companyList.getId());
        log.info("QUANTIDADE DE EMPRESAS NO GRUPO RETORNADA: " + companyList.getEmpresas().size());
        
        H1 h1 = new H1("Sistema de Conciliação Contábil");
        Image logo = new Image("./images/logo-clear-black.png", "Logo cont");
        ComboBox<String> companyPicker = new ComboBox<>("Seleciona a Empresa: ");
        ComboBox<String> monthPicker = new ComboBox<>("Selecione o Período: ");
        logo.setMaxHeight("200px");
        UI.getCurrent().addAttachListener(event -> setComboBoxValues(companyPicker, monthPicker));
        
        Locale locale = new Locale.Builder().setLanguage("pt").setRegion("BR").build();
        monthPicker.setItems(Stream.of(Month.values())
                .map(month -> month.getDisplayName(TextStyle.FULL, locale).toUpperCase())
                .collect(Collectors.toList()));
        monthPicker.getStyle().setPadding("30px");
        
        companyPicker.setItems(
                companyList.empresas.stream().map(Empresa::getNomeEmpresa).toList()
        );
        
        monthPicker.addValueChangeListener(
                value -> monthPicker.getValue()
        );
        monthPicker.addValueChangeListener(
                value -> companyPicker.getValue()
        );
        
        HorizontalLayout horizontalLayout = new HorizontalLayout(companyPicker, monthPicker);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
        
        Button confirmButton = new Button("Confirmar");
        confirmButton.getStyle().setBackground("green");
        confirmButton.getStyle().set("color", "white");
        Span versionFooter = new Span("Versão " + version);
        versionFooter.getStyle().setTextAlign(Style.TextAlign.CENTER).setPadding("30px");
        FlexLayout verticalLayout = new FlexLayout(h1, logo, horizontalLayout, confirmButton, versionFooter);
        verticalLayout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        verticalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        verticalLayout.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        verticalLayout.getStyle().setMargin("20px");
        monthPicker.getStyle().setTextAlign(Style.TextAlign.CENTER);
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        monthPicker.addValueChangeListener(event -> {
            page.executeJs("localStorage.setItem($0, $1)", "month", event.getValue());
            page.executeJs("localStorage.setItem('month', $0)", event.getValue());
            log.info("PERÍODO SELECIONADO: " + event.getValue());
        });
        
        companyPicker.addValueChangeListener(event -> {
            page.executeJs("localStorage.setItem($1, $1)", "company-name", event.getValue());
            page.executeJs("localStorage.setItem('company-name', $0)", event.getValue());
        });
        companyPicker.addValueChangeListener(event -> {
            page.executeJs("localStorage.setItem($1, $1)", "company-name", event.getValue());
            page.executeJs("localStorage.setItem('company-name', $0)", event.getValue());
            log.info("EMPRESA SELECIONADA: " + event.getValue());
        });
        confirmButton.addClickListener(click -> UI.getCurrent().navigate("/balancete"));
        
        add(new HorizontalLayout(FlexComponent.JustifyContentMode.CENTER, verticalLayout));
    }
}

