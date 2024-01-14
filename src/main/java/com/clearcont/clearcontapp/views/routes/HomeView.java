package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.helpers.Periodo;
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
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Value;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Route(value = "", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
public class HomeView extends Div {
    String version = "0.0.2-ALPHA";
    
    public HomeView(EmpresaGroupService empresaGroupService) {
        EmpresaGroup companyList = empresaGroupService.getByID(1);
        String CLASS_NAME = HomeView.class.getSimpleName();
        Log.log(CLASS_NAME, "ID COMPANY GROUP RETORNADA: " + companyList.getId());
        Log.log(CLASS_NAME, "QUANTIDADE DE EMPRESAS NO GRUPO RETORNADA: " + companyList.getEmpresas().size());
        
        H1 h1 = new H1("Sistema de Conciliação Contabil");
        Image logo = new Image("./images/logo-clear-black.png", "Logo cont");
        ComboBox<String> companyPicker = new ComboBox<>("Seleciona a Empresa: ");
        ComboBox<String> monthPicker = new ComboBox<>("Selecione o Período: ");
        logo.setMaxHeight("200px");
        
        Locale locale = new Locale.Builder().setLanguage("pt").setRegion("BR").build();
        monthPicker.setItems(Stream.of(Month.values())
                .map(month -> month.getDisplayName(TextStyle.FULL, locale).toUpperCase())
                .collect(Collectors.toList()));
        monthPicker.getStyle().setPadding("30px");
        
        companyPicker.setItems(
                companyList.empresas.stream().map(Empresa::getNomeEmpresa).toList()
        );
        
        HorizontalLayout horizontalLayout = new HorizontalLayout(companyPicker, monthPicker);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
        
        Button confirmButton = new Button("Confirmar");
        confirmButton.getStyle().setBackground("green");
        confirmButton.getStyle().set("color", "white");
        Span versionFooter = new Span("Versão " + version);
        versionFooter.getStyle().setTextAlign(Style.TextAlign.CENTER).setPadding("30px");
        VerticalLayout verticalLayout = new VerticalLayout(h1, logo, horizontalLayout, confirmButton,versionFooter);
        verticalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        verticalLayout.getStyle().setMargin("20px");
        monthPicker.getStyle().setTextAlign(Style.TextAlign.CENTER);
        
        monthPicker.addValueChangeListener(event -> {
            Periodo.periodo = event.getValue();
            Log.log(HomeView.class.getSimpleName(), "PERIODO SELECIONADO: " + Periodo.periodo);
        });
        
        confirmButton.addClickListener(click -> UI.getCurrent().navigate("/balancete"));
        
        
        add(new HorizontalLayout(FlexComponent.JustifyContentMode.CENTER, verticalLayout));
    }
}

