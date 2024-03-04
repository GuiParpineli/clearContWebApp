package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.components.TopBarControleView;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("Controle")
@PermitAll
@Setter
@Getter
public class ControleView extends Div implements MonthAndCompany {
    String month;
    Empresa empresa;
    
    public ControleView(@NotNull ControleService service, EmpresaRepository empresaRepository) {
        getCompany(empresaRepository, empresa -> getMonth(month -> {
            int year = LocalDate.now().getYear();
            List<Controle> controleList = service.getAllByMonthAndCompanyID(empresa.getId(), month, year);
            Grid<Controle> grid = new Grid<>(Controle.class, false);
            grid.addColumn(Controle::getNomeConta).setHeader("Nome da conta").setSortable(true);
            grid.addColumn(Controle::getSaldoBalancete).setHeader("Saldo Balancete");
            grid.addColumn(Controle::getSaldoAnalise).setHeader("Saldo Analise");
            grid.addColumn(Controle::getValorDiferenca).setHeader("Valor da Diferença");
            grid.addColumn(Controle::getNomeResponsavel).setHeader("Responsável");
            grid.setItems(controleList);

            add(new VerticalLayout(FlexComponent.Alignment.CENTER, new TopBarControleView(service, empresaRepository), grid));
        }));
    }
}