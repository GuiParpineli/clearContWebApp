package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.DocumentosAnexados;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.service.ComposicaoLanContabeisService;
import com.clearcont.clearcontapp.views.components.details.GridConciliar;
import com.clearcont.clearcontapp.views.components.details.InfoCardsConciliacao;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Route(value = "detail", layout = MainLayout.class)
@PermitAll
@Slf4j
public class DetailView extends VerticalLayout implements HasUrlParameter<String> {
    
    private final BalanceteService service;
    private final ComposicaoLanContabeisService contabeisService;
    private final ResponsavelRepository responsavelRepository;
    
    @Autowired
    public DetailView(BalanceteService service, ComposicaoLanContabeisService contabeisService, ResponsavelRepository responsavelRepository) {
        this.service = service;
        this.contabeisService = contabeisService;
        this.responsavelRepository = responsavelRepository;
    }
    
    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        Integer balanceteId = Integer.parseInt(parameter);
        Balancete balancete = service.getById(balanceteId);
        List<DocumentosAnexados> documentosAnexadosList = new ArrayList<>();
        
        GridConciliar crud = new GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository);
        ComposicaoLancamentosContabeis conciliacao = contabeisService.getByID(balanceteId);
        double saldoContabil = contabeisService.getSaldoContabil(balanceteId);
        
        InfoCardsConciliacao infoCards = new InfoCardsConciliacao(balancete, conciliacao, saldoContabil);
        log.info("TAMANHO COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());
        
        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infoCards, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);
        
        add(conciliacaoContabil);
    }
    
    
}