package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("Balancete | ClearCont App")
public class BalanceteView extends Div {

    public BalanceteView(BalanceteService service) {
        List<Balancete> balanceteData = service.getAll();

        Grid<Balancete> grid = new Grid<>(Balancete.class, false);
        grid.addColumn(balancete -> balancete.getCliente().getNomeEmpresa()).setHeader("Empresa");
        grid.addColumn(Balancete::getNumeroConta).setHeader("Nº conta");
        grid.addColumn(Balancete::getNomeConta).setHeader("Nome da Conta");
        grid.addColumn(Balancete::getTotalBalancete).setHeader("Total Balancete");
        grid.addColumn(Balancete::getClassificacao).setHeader("CLASSIFICAÇÃO");
        grid.setItems(balanceteData);

        add(grid);
    }
}
