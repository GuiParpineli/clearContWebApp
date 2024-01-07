package com.clearcont.clearcontapp.views.routes;


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
import com.vaadin.flow.server.VaadinService;
import jakarta.servlet.http.Cookie;

import java.util.List;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("Balancete | ClearCont App")
public class BalanceteView extends Div {
    Integer id = 0;
    private final String CLAS_NAME = BalanceteView.class.getSimpleName();
    
    public BalanceteView(BalanceteService service) {
        // Adicionar um novo cookie ao response atual
        Cookie novoCookie = new Cookie("company-id", "1");
        // Definir o tempo de expiração do cookie em segundos
        novoCookie.setMaxAge(60 * 60 * 24); // 24 horas
        // Adicionar o cookie ao response
        VaadinService.getCurrentResponse().addCookie(novoCookie);
        
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("company-id")) {
                id = Integer.valueOf(cookie.getValue());
                Log.log(CLAS_NAME, "O valor do cookie é: " + cookie.getValue());
                break;
            }
        }
        
        
        Log.log(BalanceteView.class.getSimpleName(),
                "MES DO BALANCETE: " + Periodo.periodo + ", " +
                " PERFIL ID: " + id
        );
        
        List<Balancete> balanceteData = service.getByCompanyAndPeriod(
                id, Periodo.periodo, 2024
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
