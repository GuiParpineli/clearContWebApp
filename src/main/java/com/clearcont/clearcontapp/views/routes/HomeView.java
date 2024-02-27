package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.EmpresaGroup;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
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
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.stream.Stream;


@Route(value = "", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
@PermitAll
@Slf4j
@Getter
@Setter
public class HomeView extends Div implements MonthAndCompany {
    private Empresa empresa;
    private String month;
    @Value("${version}")
    private String version;
    
    private void setComboBoxValues(ComboBox<String> companyPicker, ComboBox<String> monthPicker) {
        UI.getCurrent().getPage().executeJs("return sessionStorage.getItem('month')")
                .then(String.class, savedMonth -> {
                    if (savedMonth != null && !savedMonth.isEmpty()) {
                        monthPicker.setValue(savedMonth);
                    }
                });
        UI.getCurrent().getPage().executeJs("return sessionStorage.getItem('company-name')")
                .then(String.class, savedCompanyName -> {
                    if (savedCompanyName != null && !savedCompanyName.isEmpty()) {
                        companyPicker.setValue(savedCompanyName);
                    }
                });
    }
    
    public HomeView(EmpresaGroupService empresaGroupService, EmpresaRepository empresaRepository) {
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        getCompany(empresaRepository, empresa -> getMonth(month -> {
            
            CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
            int id = cookieFactory.getCookieInteger("company-group-id");
            EmpresaGroup companyList = empresaGroupService.getByID(id);
            
            log.info("ID COMPANY GROUP RETORNADA: " + companyList.getId());
            log.info("QUANTIDADE DE EMPRESAS NO GRUPO RETORNADA: " + companyList.getEmpresas().size());
            
            H1 h1 = new H1("Sistema de Conciliação Contábil");
            Image logo = new Image("./images/logo-clear-black.png", "Logo cont");
            logo.setMaxHeight("200px");
            
            ComboBox<String> companyPicker = getCompanyPicker(companyList, page);
            ComboBox<String> monthPicker = getMonthPicker(companyPicker, logo, page);
            
            UI.getCurrent().addAttachListener(event -> setComboBoxValues(companyPicker, monthPicker));
            
            if (month != null && empresa.getNomeEmpresa() != null) {
                monthPicker.setValue(month);
                companyPicker.setValue(empresa.getNomeEmpresa());
            }
            
            HorizontalLayout horizontalLayout = new HorizontalLayout(companyPicker, monthPicker);
            horizontalLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
            
            Button confirmButton = getConfirmButton();
            Span versionFooter = getVersionFooter();
            FlexLayout verticalLayout = getFlexLayout(h1, logo, horizontalLayout, confirmButton, versionFooter);
            
            add(new HorizontalLayout(FlexComponent.JustifyContentMode.CENTER, verticalLayout));
        }));
    }
    
    private Span getVersionFooter() {
        Span versionFooter = new Span("Versão " + version + " - Todos direitos reservados.");
        versionFooter.getStyle().setTextAlign(Style.TextAlign.CENTER).setPadding("30px");
        versionFooter.getStyle().setPosition(Style.Position.ABSOLUTE).setBottom("0");
        return versionFooter;
    }
    
    private static Button getConfirmButton() {
        Button confirmButton = new Button("Confirmar");
        confirmButton.getStyle().setBackground("green");
        confirmButton.getStyle().set("color", "white");
        confirmButton.addClickListener(click -> UI.getCurrent().navigate("/balancete"));
        return confirmButton;
    }
    
    private static ComboBox<String> getCompanyPicker(EmpresaGroup companyList, Page page) {
        ComboBox<String> companyPicker = new ComboBox<>("Seleciona a Empresa: ");
        companyPicker.setItems(companyList.empresas.stream().map(Empresa::getNomeEmpresa).toList());
        
        companyPicker.addValueChangeListener(event -> {
            page.executeJs("sessionStorage.setItem($1, $1)", "company-name", event.getValue());
            page.executeJs("sessionStorage.setItem('company-name', $0)", event.getValue());
        });
        companyPicker.addValueChangeListener(event -> {
            page.executeJs("sessionStorage.setItem($1, $1)", "company-name", event.getValue());
            page.executeJs("sessionStorage.setItem('company-name', $0)", event.getValue());
            log.info("EMPRESA SELECIONADA: " + event.getValue());
        });
        return companyPicker;
    }
    
    private ComboBox<String> getMonthPicker(ComboBox<String> companyPicker, Image logo, Page page) {
        ComboBox<String> monthPicker = new ComboBox<>("Selecione o Período: ");
        
        
        Locale locale = new Locale.Builder().setLanguage("pt").setRegion("BR").build();
        monthPicker.setItems(Stream.of(Month.values())
                .map(months -> months.getDisplayName(TextStyle.FULL, locale).toUpperCase()).toList());
        monthPicker.getStyle().setPadding("30px");
        monthPicker.addValueChangeListener(value -> monthPicker.getValue());
        monthPicker.addValueChangeListener(value -> companyPicker.getValue());
        
        monthPicker.getStyle().setTextAlign(Style.TextAlign.CENTER);
        
        monthPicker.addValueChangeListener(event -> {
            page.executeJs("sessionStorage.setItem($0, $1)", "month", event.getValue());
            page.executeJs("sessionStorage.setItem('month', $0)", event.getValue());
            log.info("PERÍODO SELECIONADO: " + event.getValue());
        });
        return monthPicker;
    }
    
    private static FlexLayout getFlexLayout(H1 h1, Image logo, HorizontalLayout horizontalLayout, Button confirmButton, Span versionFooter) {
        FlexLayout verticalLayout = new FlexLayout(h1, logo, horizontalLayout, confirmButton, versionFooter);
        verticalLayout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        verticalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        verticalLayout.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        verticalLayout.getStyle().setMargin("20px");
        verticalLayout.setHeight("100vh");
        return verticalLayout;
    }
}

