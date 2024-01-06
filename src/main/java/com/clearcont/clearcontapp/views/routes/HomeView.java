package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.helpers.Periodo;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Route(value = "", layout = MainLayout.class)
@PageTitle("Home| Nome do Aplicativo")
public class HomeView extends Div {
    public HomeView() {
        
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
        
        companyPicker.setItems();
        HorizontalLayout horizontalLayout = new HorizontalLayout(companyPicker, monthPicker);
        horizontalLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
        
        VerticalLayout verticalLayout = new VerticalLayout(h1, logo, horizontalLayout);
        verticalLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        monthPicker.getStyle().setTextAlign(Style.TextAlign.CENTER);
        verticalLayout.getStyle().setMargin("20px");
        
        monthPicker.addValueChangeListener(event -> {
            Periodo.periodo = event.getValue();
            Log.log(HomeView.class.getSimpleName(), "PERIODO SELECIONADO: " + Periodo.periodo);
        });
        
        add(new HorizontalLayout(FlexComponent.JustifyContentMode.CENTER, verticalLayout));
    }
}

