package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.helpers.Periodo;
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
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;

import java.time.LocalDate;
import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("controle | ClearCont App")
@PermitAll
public class ControleView extends Div {
    public ControleView(ControleService service) {
        
        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        String month = cookieFactory.getCookieString("month");
        int year = LocalDate.now().getYear();
        Integer id = cookieFactory.getCookieInteger("company-id");
        
        List<Controle> controleList = service.getAllByMonthAndCompanyID(id, month, year);
        Grid<Controle> grid = new Grid<>(Controle.class, false);
        grid.addColumn(Controle::getNomeConta).setHeader("Nome da conta").setSortable(true);
        grid.addColumn(Controle::getSaldoBalancete).setHeader("Saldo Balancete");
        grid.addColumn(Controle::getSaldoAnalise).setHeader("Saldo Analise");
        grid.addColumn(Controle::getValorDiferenca).setHeader("Valor da Diferença");
        grid.addColumn(Controle::getNomeResponsavel).setHeader("Responsável");
        grid.setItems(controleList);
        
        add(new VerticalLayout(FlexComponent.Alignment.CENTER, new TopBarControleView(service), grid));
    }
}
