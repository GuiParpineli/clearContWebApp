package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.components.TopBarControleView;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("controle | ClearCont App")
public class ControleView extends Div {
    public ControleView(ControleService service) {
        
        List<Controle> controleList = service.getAll();
        Grid<Controle> grid = new Grid<>(Controle.class, false);
        grid.addColumn(controle -> controle.getCliente().getNomeEmpresa()).setHeader("Cliente").setSortable(true);
        grid.addColumn(Controle::getAgingListadaPendencia).setHeader("Aging");
        grid.addColumn(Controle::getResponsavel).setHeader("Responsavel");
        grid.addColumn(Controle::getSaldoAnalise).setHeader("Saldo Analise");
        grid.addColumn(Controle::getSaldoBalancete).setHeader("Saldo Balancete");
        grid.setItems(controleList);
        
        add(new VerticalLayout(FlexComponent.Alignment.CENTER, new TopBarControleView(service), grid));
    }
}
