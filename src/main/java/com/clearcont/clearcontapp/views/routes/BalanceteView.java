package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("balancete | ClearCont App")
public class BalanceteView extends Div {
    public BalanceteView() {
        add(new H1("Hello balancete"));
    }
}
