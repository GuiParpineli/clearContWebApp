package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.helpers.MonthAndCompany;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.Responsavel;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.service.CustomerContabilService;
import com.clearcont.clearcontapp.views.components.GridCustomer;
import com.clearcont.clearcontapp.views.components.GridFornecedores;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.RolesAllowed;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Route(value = "fornecedores", layout = MainLayout.class)
@PageTitle("Fornecedores")
@RolesAllowed("ADMIN")
@Getter
@Setter
@Slf4j
public class FornecedoresView extends FlexLayout implements MonthAndCompany {
    private String month;
    private Empresa empresa;

    public FornecedoresView(CustomerContabilService customerContabilRepository, EmpresaRepository empresaRepository, BalanceteService balanceteService, ResponsavelRepository responsavelRepository) {
        initializeView(customerContabilRepository, empresaRepository, balanceteService, responsavelRepository);
    }

    private void initializeView(CustomerContabilService customerContabilRepository, EmpresaRepository empresaRepository, BalanceteService balanceteService, ResponsavelRepository responsavelRepository) {
        getCompany(empresaRepository, empresa -> getMonth(month -> {
                    if (empresa == null) {
                        Notification.show("Selecione uma empresa e periodo");
                        UI.getCurrent().navigate("/");
                    }

                    CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
                    Long responsavelID = cookieFactory.getCookieInteger("responsavel-id");
                    Responsavel responsavel = responsavelRepository.findById(responsavelID).orElseThrow();
                    Long empresaId = empresa.getId();
                    List<Balancete> balanceteData = balanceteService.getByCompanyAndPeriod(empresaId, month, LocalDate.now().getYear());
                    log.info("Empresa selecionada: " + empresa.getNomeEmpresa());
                    GridFornecedores gridCustomer = new GridFornecedores(customerContabilRepository, balanceteData, responsavel);
                    H1 clientes = new H1("Fornecedores");
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