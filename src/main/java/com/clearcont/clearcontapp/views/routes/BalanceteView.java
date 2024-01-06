package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.helpers.CompanyID;
import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.helpers.Periodo;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.util.List;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("Balancete | ClearCont App")
public class BalanceteView extends Div {
    
    public BalanceteView(BalanceteService service) {
        LocalDate localDate = LocalDate.now();
        
        
        Log.log(BalanceteView.class.getSimpleName(),
                "MES DO BALANCETE: " + Periodo.periodo + ", " +
                " PERFIL ID: " + CompanyID.ID
        );
        
        List<Balancete> balanceteData = service.getByCompanyAndPeriod(
                CompanyID.ID, Periodo.periodo, 2024
        );
        
        
        Log.log(BalanceteView.class.getSimpleName(),
                "TAMANHO TOTAL DA LISTA BALANCETE: " + balanceteData.size());
        
        Grid<Balancete> grid = new Grid<>(Balancete.class, false);
        grid.getStyle().set("border-radius", "10px");
        
        grid.addColumn(balancete -> balancete.getEmpresa().getNomeEmpresa()).setHeader("Empresa").setSortable(true);
        grid.addColumn(Balancete::getNumeroConta).setHeader("Nº conta").setSortable(true);
        grid.addColumn(Balancete::getNomeConta).setHeader("Nome da Conta").setSortable(true);
        grid.addColumn(Balancete::getTotalBalancete).setHeader("Total Balancete").setSortable(true);
        grid.addColumn(Balancete::getClassificacao).setHeader("Classificação").setSortable(true);
        
        grid.setItems(balanceteData);
        grid.addItemClickListener(event -> {
            Balancete balancete = event.getItem();
            UI.getCurrent().navigate("detail/" + balancete.getId());
        });
        add(grid);
    }
}
