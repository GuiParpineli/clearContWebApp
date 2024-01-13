package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.DocumentosAnexados;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.service.ComposicaoLanContabeisService;
import com.clearcont.clearcontapp.views.components.details.GridConciliar;
import com.clearcont.clearcontapp.views.components.details.InfoCardsConciliacao;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;

@Route(value = "detail", layout = MainLayout.class)
public class DetailView extends VerticalLayout implements HasUrlParameter<String> {
    
    private final String CLASS_NAME = DetailView.class.getSimpleName();
    private final BalanceteService service;
    private final ComposicaoLanContabeisService contabeisService;
    
    @Autowired
    public DetailView(BalanceteService service, ComposicaoLanContabeisService contabeisService) {
        this.service = service;
        this.contabeisService = contabeisService;
    }
    
    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        Integer balanceteId = Integer.parseInt(parameter);
        Balancete balancete = service.getById(balanceteId);
        List<DocumentosAnexados> documentosAnexadosList = new ArrayList<>();
        
        GridConciliar crud = new GridConciliar(balancete, contabeisService, balanceteId);
        ComposicaoLancamentosContabeis conciliacao = contabeisService.getByID(balanceteId);
        double saldoContabil = contabeisService.getSaldoContabil(balanceteId);
        
        InfoCardsConciliacao infoCards = new InfoCardsConciliacao(balancete, conciliacao, saldoContabil);
        Log.log(CLASS_NAME, "TAMANHO COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());
        
        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infoCards, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);
        
        add(conciliacaoContabil);
    }
    
    
}