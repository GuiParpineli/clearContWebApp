package com.clearcont.clearcontapp.views.components;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import com.clearcont.clearcontapp.helpers.Periodo;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.components.controle.TopBarText;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.server.VaadinService;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.function.Consumer;


@Setter
public class TopBarControleView extends FlexLayout {
    String month;
    Empresa empresa;
    
    Div createSeparator() {
        Div separator = new Div();
        separator.getStyle().setBackground("white");
        separator.setWidth("2px");
        return separator;
    }
    
    UI ui = UI.getCurrent();
    Page page = ui.getPage();
    
    private void getCompany(EmpresaRepository empresaRepository, Consumer<Empresa> callback) {
        page.executeJs("return sessionStorage.getItem($0)", "company-name")
                .then(item -> {
                    setEmpresa(empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElseThrow());
                    System.out.println("Valor do sessionStorage para 'company-name': " + item.asString());
                    callback.accept(empresa);
                });
    }
    
    private void getMonth(Consumer<String> callback) {
        page.executeJs("return sessionStorage.getItem($0)", "month")
                .then(item -> {
                    setMonth(item.asString());
                    System.out.println("Valor do sessionStorage para 'month': " + item.asString());
                    callback.accept(month);
                });
    }
    
    public TopBarControleView(ControleService controleService, EmpresaRepository empresaRepository) {
        getCompany(empresaRepository, empresa -> {
            getMonth(month -> {
                int year = LocalDate.now().getYear();
                Long id = empresa.getId();
                
                Empresa empresaTopBar = controleService.getAllByMonthAndCompanyID(id, month, year).getLast().getEmpresa();
                Controle controle = controleService.getAllByMonthAndCompanyID(id, month, year).getFirst();
                Image logo = new Image("./images/logo-white.png", "Logo");
                logo.setMaxHeight("80px");
                logo.getStyle().setPadding("50px");
                
                Div b1 = TopBarText.make("Empresa:", "CNPJ:", "Competência:");
                Div b2 = new Div(
                        new Paragraph(empresaTopBar.getNomeEmpresa()),
                        new Paragraph(empresaTopBar.getCnpj()),
                        new Paragraph(controle.getDataCompetencia()
                                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy")))
                );
                Div b3 = TopBarText.make("Resumo Balancete:", "ATIVO:", "PASSIVO:", "PL:", "RESULTADO:");
                Div b4 = new Div(
                        new Paragraph("Valor"),
                        new Paragraph(controle.getCirculante()),
                        new Paragraph(controle.getSaldoAnalise().toString()),
                        new Paragraph(controle.getSaldoBalancete().toString()),
                        new Paragraph(DecimalFormatBR.getDecimalFormat().format(controle.getDoubleSaldoBalancete() - controle.getDoubleSaldoAnalise()))
                );
                Div b5 = new Div(
                        new VerticalLayout(
                                Alignment.CENTER,
                                new Paragraph("Baixar Balancete Final em Excel: "),
                                new Button(new Icon("download"))
                        )
                );

//        button.addClickListener (event -> {
//            Notification.show ("Arquivo baixado");
//        });
                
                
                b1.getStyle().setPadding("20px");
                b2.getStyle().setTextAlign(Style.TextAlign.RIGHT);
                b2.getStyle().setPadding("20px");
                b4.getStyle().setTextAlign(Style.TextAlign.RIGHT);
                b4.getStyle().setPadding("20px");
                b3.getStyle().setPadding("20px");
                b5.getStyle().setColor("white");
                
                FlexLayout companyInfo = new FlexLayout(createSeparator(), b1, b2);
                companyInfo.getStyle().set("flex", "auto");
                companyInfo.setJustifyContentMode(JustifyContentMode.AROUND);
                companyInfo.getStyle().setColor("white");
                companyInfo.setFlexBasis("25%");
                
                FlexLayout companyBalanceteResume = new FlexLayout(createSeparator(), b3, b4);
                companyBalanceteResume.getStyle().set("flex", "auto");
                companyBalanceteResume.setJustifyContentMode(JustifyContentMode.AROUND);
                companyBalanceteResume.getStyle().setColor("white");
                companyBalanceteResume.getStyle().setPadding("20px");
                companyBalanceteResume.setFlexBasis("25%");
                
                FlexLayout downloadBalancete = new FlexLayout(createSeparator(), b5);
                downloadBalancete.getStyle().set("flex", "auto");
                downloadBalancete.setJustifyContentMode(JustifyContentMode.AROUND);
                downloadBalancete.getStyle().setColor("white");
                downloadBalancete.getStyle().setPadding("20px");
                downloadBalancete.setFlexBasis("25%");
                
                FlexLayout items = new FlexLayout(
                        logo, companyInfo, companyBalanceteResume, downloadBalancete
                );
                items.setAlignItems(Alignment.CENTER);
                items.setFlexWrap(FlexWrap.WRAP);
                items.setAlignContent(ContentAlignment.SPACE_BETWEEN);
                items.getStyle().setPadding("10px");
                items.setMaxWidth("80vw");
                
                FlexLayout div = new FlexLayout(items);
                div.getStyle().setBackground("black");
                div.getStyle().set("border-radius", "12px");
                div.setFlexWrap(FlexWrap.WRAP);
                
                this.setFlexDirection(FlexDirection.COLUMN);
                add(div);
            });
        });
    }
}