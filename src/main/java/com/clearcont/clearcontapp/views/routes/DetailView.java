package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

@Route(value = "detail", layout = MainLayout.class)
public class DetailView extends VerticalLayout implements HasUrlParameter<String> {

    private final BalanceteService service;

    @Autowired
    public DetailView(BalanceteService service) {
        this.service = service;
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        Integer balanceteId = Integer.parseInt(parameter);
        Balancete balancete = service.getById(balanceteId);

        add(new Text("Exibindo detalhes para Balancete com conta: " + balancete.getNomeConta()));
    }
}