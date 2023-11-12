package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.data.provider.DataGenerator;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("controle | ClearCont App")
public class ControleView extends Div {
    public ControleView(ControleService service) {
        List<Controle> controleList = service.getAll();
        Grid<Controle> grid = new Grid<>(Controle.class, true);
        grid.setItems(controleList);
        add(grid);
    }
}
