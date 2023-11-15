package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.model.Cliente;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.service.ControleService;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;

public class TopBarControleView extends FlexLayout {
    Div createSeparator() {
        Div separator = new Div();
        separator.getStyle().setBackground("white");
        separator.setWidth("2px");
        return separator;
    }

    public TopBarControleView(ControleService controleService) {

        Cliente cliente = controleService.getAll().getFirst().getCliente();
        Controle controle = controleService.getAll().getFirst();
        Image logo = new Image("./images/logo-white-header.png", "Logo");
        logo.setMaxHeight("100px");

        Div b1 = new Div(
                new Paragraph("Empresa:"),
                new Paragraph("CNPJ:"),
                new Paragraph("Competência:")
        );
        Div b2 = new Div(
                new Paragraph(cliente.getNomeEmpresa()),
                new Paragraph(cliente.getCnpj()),
                new Paragraph("Competência")
        );
        Div b3 = new Div(
                new Paragraph("Resumo Balancete:"),
                new Paragraph("ATIVO:"),
                new Paragraph("PASSIVO:"),
                new Paragraph("PL:"),
                new Paragraph("RESULTADO:")
        );
        Div b4 = new Div(
                new Paragraph("Valor"),
                new Paragraph(controle.getCirculante()),
                new Paragraph(controle.getSaldoAnalise().toString()),
                new Paragraph(controle.getSaldoBalancete().toString()),
                new Paragraph(String.valueOf(controle.getSaldoBalancete() - controle.getSaldoAnalise()))
        );
        Div b5 = new Div(
                new VerticalLayout(
                        Alignment.CENTER,
                        new Paragraph("Balancete FInal em PDF"),
                        new Icon("download")
                )
        );
        b2.getStyle().setTextAlign(Style.TextAlign.RIGHT);
        b4.getStyle().setTextAlign(Style.TextAlign.RIGHT);
        b5.getStyle().setColor("white");

        FlexLayout companyInfo = new FlexLayout(createSeparator(), b1, b2);
        companyInfo.getStyle().set("flex", "auto");
        companyInfo.setJustifyContentMode(JustifyContentMode.AROUND);
        companyInfo.getStyle().setColor("white");

        FlexLayout companyBalanceteResume = new FlexLayout(createSeparator(), b3, b4);
        companyBalanceteResume.getStyle().set("flex", "auto");
        companyBalanceteResume.setJustifyContentMode(JustifyContentMode.AROUND);
        companyBalanceteResume.getStyle().setColor("white");

        FlexLayout downloadBalancete = new FlexLayout(createSeparator(), b5);
        downloadBalancete.getStyle().set("flex", "auto");
        downloadBalancete.setJustifyContentMode(JustifyContentMode.AROUND);
        companyBalanceteResume.getStyle().setColor("white");

        HorizontalLayout items = new HorizontalLayout(
                JustifyContentMode.BETWEEN, logo, companyInfo, companyBalanceteResume, downloadBalancete
        );
        items.setAlignItems(Alignment.CENTER);

        Div div = new Div(items);
        div.getStyle().setBackground("black");
        div.getStyle().setPadding("10px");
        div.getStyle().set("border-radius", "12px");
        div.setWidth("calc(100vw - 360px)");

        this.setFlexDirection(FlexDirection.COLUMN);
        add(div);
    }
}
