package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.service.ControleService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route(value = "controle", layout = MainLayout.class)
@PageTitle("controle | ClearCont App")
public class ControleView extends Div {
    public ControleView(ControleService service) {

        Div div = new Div(new Text("Empresa"));
        div.getStyle().setBackground("black");
        div.getStyle().setPadding("10px");
        div.getStyle().set("border-radius", "12px");

        List<Controle> controleList = service.getAll();
        Grid<Controle> grid = new Grid<>(Controle.class, true);
        grid.setItems(controleList);


        add(new VerticalLayout(div, grid));
    }
}
