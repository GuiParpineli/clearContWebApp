package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
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
        grid.getStyle().set("border-radius", "10px");

        Grid.Column<Balancete> empresaColumn = grid.addColumn(balancete -> balancete.getCliente().getNomeEmpresa()).setHeader("Empresa");
        empresaColumn.setSortable(true);

        Grid.Column<Balancete> numeroContaColumn = grid.addColumn(Balancete::getNumeroConta).setHeader("Nº conta");
        numeroContaColumn.setSortable(true);

        Grid.Column<Balancete> nomeContaColumn = grid.addColumn(Balancete::getNomeConta).setHeader("Nome da Conta");
        nomeContaColumn.setSortable(true);

        Grid.Column<Balancete> totalBalanceteColumn = grid.addColumn(Balancete::getTotalBalancete).setHeader("Total Balancete");
        totalBalanceteColumn.setSortable(true);

        Grid.Column<Balancete> classificacaoColumn = grid.addColumn(Balancete::getClassificacao).setHeader("CLASSIFICAÇÃO");
        classificacaoColumn.setSortable(true);

        grid.setItems(balanceteData);
        grid.addItemClickListener(event -> {
            Balancete balancete = event.getItem();
            UI.getCurrent().navigate("detail/" + balancete.getId());
        });
        add(grid);
    }
}
