package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.components.GridCustomer;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;


@Route(value = "clientes", layout = MainLayout.class)
@PageTitle("Clientes| ClearCont App")
@RolesAllowed("ADMIN")
@Getter
@Setter
@Slf4j
public class CustomersView extends FlexLayout implements MonthAndCompany {
    private String month;
    private Empresa empresa;

    public CustomersView(CustomerContabilRepository customerContabilRepository, EmpresaRepository empresaRepository, BalanceteService balanceteService) {
        initializeView(customerContabilRepository, empresaRepository, balanceteService);
    }

    private void initializeView(CustomerContabilRepository customerContabilRepository, EmpresaRepository empresaRepository, BalanceteService balanceteService) {
        getCompany(empresaRepository, empresa -> getMonth(month -> {
                    if (empresa == null) {
                        Notification.show("Selecione uma empresa e periodo");
                        UI.getCurrent().navigate("/");
                    }

                    Long empresaId = empresa.getId();
                    List<Balancete> balanceteData = balanceteService.getByCompanyAndPeriod(empresaId, month, LocalDate.now().getYear());
                    log.info("Empresa selecionada: " + empresa.getNomeEmpresa());
                    GridCustomer gridCustomer = new GridCustomer(customerContabilRepository, balanceteData);
                    H1 clientes = new H1("Clientes");
                    Span span = new Span(empresa.getNomeEmpresa());
                    Span subtitle = new Span("Selecione um balancete do periodo: " + month + " " + LocalDate.now().getYear());
                    VerticalLayout verticalLayout = new VerticalLayout(
                            new VerticalLayout(clientes, span, subtitle),
                            gridCustomer
                    );
                    add(verticalLayout);
                }
        ));
    }
}