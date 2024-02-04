package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.Responsavel;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.ComposicaoLancamentosContabeisService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.storedobject.chart.*;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Route(value = "dashboard", layout = MainLayout.class)
@PageTitle("Dashboard | Nome do Aplicativo")
@RolesAllowed("ADMIN")
@Setter
@Getter
public class DashboardView extends FlexLayout implements MonthAndCompany {
    private String month;
    private Empresa empresa;
    private int totalOpen;
    private int totalProgress;
    private int totalFinish;
    
    public DashboardView(ResponsavelRepository responsavelRepository, EmpresaRepository empresaRepository, ComposicaoLancamentosContabeisService cLContabeisService) {
        getCompany(empresaRepository, empresa -> {
            
            List<Responsavel> responsaveisList = responsavelRepository.findResponsavelByEmpresa_Id(empresa.getId());
            ComboBox<String> responsavelPicker = new ComboBox<>("Selecione o Responsável");
            
            responsavelPicker.setItems(responsaveisList.stream()
                    .map(responsavel -> responsavel.getId() + " - " + responsavel.getNome()).toList());
            
            SOChart soChart = new SOChart();
            soChart.setSize("800px", "500px");
            if (responsavelPicker.getValue() == null){
                responsavelPicker.setValue(responsaveisList.getFirst().getId() + " - " + responsaveisList.getFirst().getNome());
            }
            String[] split = responsavelPicker.getValue().split(" - ");
            setTotalOpen(cLContabeisService.getTotalOpen(Integer.valueOf(split[0])));
            setTotalProgress(cLContabeisService.getTotalProgress(Integer.valueOf(split[0])));
            setTotalFinish(cLContabeisService.getTotalFinish(Integer.valueOf(split[0])));
            
            responsavelPicker.addAttachListener(
                    click -> {
                        if (responsavelPicker.getValue() == null)
                            responsavelPicker.setValue(responsaveisList.getFirst().getId() + " - " + responsaveisList.getFirst().getNome());
                        setTotalOpen(cLContabeisService.getTotalOpen(Integer.valueOf(split[0])));
                        setTotalProgress(cLContabeisService.getTotalProgress(Integer.valueOf(split[0])));
                        setTotalFinish(cLContabeisService.getTotalFinish(Integer.valueOf(split[0])));
                    }
            );
            
            CategoryData labels = new CategoryData("Em Aberto", "Em Andamento", "Finalizados");
            
            Data data = new Data(totalOpen, totalProgress, totalFinish);
            
            NightingaleRoseChart nc = new NightingaleRoseChart(labels, data);
            Position p = new Position();
            p.setTop(Size.percentage(50));
            nc.setPosition(p); // Position it leaving 50% space at the top
            
            BarChart bc = new BarChart(labels, data);
            RectangularCoordinate rc;
            rc = new RectangularCoordinate(new XAxis(DataType.CATEGORY), new YAxis(DataType.NUMBER));
            p = new Position();
            p.setBottom(Size.percentage(55));
            rc.setPosition(p); // Position it leaving 55% space at the bottom
            bc.plotOn(rc); // Bar chart needs to be plotted on a coordinate system
            
            Toolbox toolbox = new Toolbox();
            toolbox.addButton(new Toolbox.Download());
            
            Title title = new Title("Responsáveis");
            
            soChart.add(nc, bc, toolbox, title);
            
            Div div = new Div(soChart);
            VerticalLayout horizontalLayout = new VerticalLayout(responsavelPicker, div);
            horizontalLayout.setAlignItems(Alignment.CENTER);
            horizontalLayout.setAlignSelf(Alignment.CENTER);
            horizontalLayout.setHorizontalComponentAlignment(Alignment.CENTER);
            horizontalLayout.getStyle().setMargin("25px");
            this.setAlignContent(ContentAlignment.CENTER);
            
            add(horizontalLayout);
        });
    }
}