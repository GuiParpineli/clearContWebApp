package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.DocumentosAnexados;
import com.clearcont.clearcontapp.model.StatusConciliacao;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.service.ComposicaoLanContabeisService;
import com.clearcont.clearcontapp.views.components.details.GridConciliar;
import com.clearcont.clearcontapp.views.components.details.InfoCardsConciliacao;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
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
        
        Button startBtn = new Button("Iniciar Conciliação");
        Button finishBtn = new Button("Fechar Conciliação");
        HorizontalLayout btns = new HorizontalLayout(startBtn, finishBtn);
        
        GridConciliar crud = new GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository);
        ComposicaoLancamentosContabeis conciliacao = contabeisService.getByID(balanceteId);
        double saldoContabil = contabeisService.getSaldoContabil(balanceteId);
        
        if (conciliacao.getStatus().equals(StatusConciliacao.PROGRESS) ||
            conciliacao.getStatus().equals(StatusConciliacao.CLOSED)) {
            startBtn.setDisableOnClick(true);
        }
        
        if (conciliacao.getStatus().equals(StatusConciliacao.OPEN) ||
            conciliacao.getStatus().equals(StatusConciliacao.CLOSED)
        ) {
            finishBtn.setDisableOnClick(true);
        }
        
        ConfirmDialog dialogStart = getConfirmDialogStart(conciliacao);
        ConfirmDialog dialogEnd = getConfirmDialogEnd(conciliacao);
        
        startBtn.addClickListener(click -> dialogStart.open());
        finishBtn.addClickListener(click -> dialogEnd.open());
        
        InfoCardsConciliacao infoCards = new InfoCardsConciliacao(balancete, conciliacao, saldoContabil);
        log.info("TAMANHO COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());
        
        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infoCards, btns, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);
        
        add(conciliacaoContabil);
    }
    
    private ConfirmDialog getConfirmDialogEnd(ComposicaoLancamentosContabeis conciliacao) {
        ConfirmDialog dialog = new ConfirmDialog();
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        
        dialog.setHeader("Iniciar conciliação");
        dialog.setText(
                "Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.");
        dialog.setCancelable(true);
        dialog.setCancelText("Cancelar");
        dialog.setConfirmText("Save");
        dialog.addConfirmListener(dialogEvent -> {
            conciliacao.setStatus(StatusConciliacao.CLOSED);
            contabeisService.update(conciliacao);
            Notification.show("CONCIALIAÇÃO FINALIZADA");
            page.reload();
        });
        return dialog;
    }
    
    private ConfirmDialog getConfirmDialogStart(ComposicaoLancamentosContabeis conciliacao) {
        ConfirmDialog dialog = new ConfirmDialog();
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        
        dialog.setHeader("Finalizar conciliação");
        dialog.setText(
                "Você tem certeza que deseja finalizar? Essa alteração não pode ser desfeita.");
        dialog.setCancelable(true);
        dialog.setCancelText("Cancelar");
        dialog.setConfirmText("Save");
        dialog.addConfirmListener(dialogEvent -> {
            conciliacao.setStatus(StatusConciliacao.PROGRESS);
            contabeisService.update(conciliacao);
            Notification.show("CONCIALIAÇÃO EM ANDAMENTO");
            page.reload();
        });
        return dialog;
    }
    
}