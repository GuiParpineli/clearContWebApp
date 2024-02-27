package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.*;
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
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Route(value = "conciliar", layout = MainLayout.class)
@PermitAll
@Slf4j
public class ConciliarView extends VerticalLayout implements HasUrlParameter<String> {

    private final BalanceteService service;
    private final ComposicaoLanContabeisService contabeisService;
    private final ResponsavelRepository responsavelRepository;
    Button startBtn = getStartBtn();
    Button finishBtn = getFinishBtn();

    @Autowired
    public ConciliarView(BalanceteService service, ComposicaoLanContabeisService contabeisService, ResponsavelRepository responsavelRepository) {
        this.service = service;
        this.contabeisService = contabeisService;
        this.responsavelRepository = responsavelRepository;
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        Long balanceteId = Long.parseLong(parameter);
        Balancete balancete = service.getById(balanceteId);
        log.info("BALANCETE ID: " + balanceteId);
        log.info("BALANCETE NOME DA CONTA: " + balancete.getNomeConta());
        List<DocumentosAnexados> documentosAnexadosList = new ArrayList<>();

        HorizontalLayout btns = new HorizontalLayout(startBtn, finishBtn);

        GridConciliar crud = new GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository);
        List<ComposicaoLancamentosContabeis> conciliacaoList = contabeisService.getByBalanceteID(balanceteId);
        if (conciliacaoList.isEmpty()) conciliacaoList = List.of(new ComposicaoLancamentosContabeis());
        ComposicaoLancamentosContabeis conciliacao = conciliacaoList.getLast();
        double saldoContabil = contabeisService.getSaldoContabil(balanceteId);

        checkStatusforDisableorEnableBtn(conciliacao);

        crud.setEnabled(!conciliacao.getStatus().equals(StatusConciliacao.OPEN) && !conciliacao.getStatus().equals(StatusConciliacao.CLOSED));

        Responsavel responsavel = responsavelRepository.findById(cookieFactory.getCookieInteger("responsavel-id")).orElseThrow();
        log.info("RESPONSAVEL NOME: " + responsavel.getNome());
        ConfirmDialog dialogStart = getConfirmDialogStart(conciliacao, balancete, responsavel);
        ConfirmDialog dialogEnd = getConfirmDialogEnd(conciliacao);

        startBtn.addClickListener(click -> dialogStart.open());
        finishBtn.addClickListener(click -> dialogEnd.open());

        InfoCardsConciliacao infoCards = new InfoCardsConciliacao(balancete, conciliacao, saldoContabil);
        log.info("ID COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());

        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infoCards, btns, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);

        add(conciliacaoContabil);
    }

    private void checkStatusforDisableorEnableBtn(ComposicaoLancamentosContabeis conciliacao) {
        if (conciliacao.getStatus().equals(StatusConciliacao.PROGRESS) ||
                conciliacao.getStatus().equals(StatusConciliacao.CLOSED)) {
            startBtn.getElement().setEnabled(false);
        }

        if (conciliacao.getStatus().equals(StatusConciliacao.OPEN) ||
                conciliacao.getStatus().equals(StatusConciliacao.CLOSED)
        ) {
            finishBtn.getElement().setEnabled(false);
        }
    }

    private Button getStartBtn() {
        Button startBtn = new Button("Iniciar Conciliação");
        startBtn.setIcon(new Icon("calc"));
        startBtn.getStyle().setBackground("#0fc90f");
        return startBtn;
    }

    private Button getFinishBtn() {
        Button finishBtn = new Button("Fechar Conciliação");
        finishBtn.setIcon(new Icon("chevron-down"));
        finishBtn.getStyle().setBackground("#ff4000c2");
        return finishBtn;
    }

    private ConfirmDialog getConfirmDialogStart(ComposicaoLancamentosContabeis conciliacao, Balancete balancete, Responsavel responsavel) {
        ConfirmDialog dialog = new ConfirmDialog();
        UI ui = UI.getCurrent();
        Page page = ui.getPage();

        dialog.setHeader("Iniciar conciliação");
        dialog.setText("Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.");
        dialog.setCancelable(true);
        dialog.setCancelText("Cancelar");
        dialog.setConfirmText("Confirmar");
        dialog.addConfirmListener(dialogEvent -> {
            if (conciliacao.getId() == null || conciliacao.getId() <= 0) contabeisService.save(
                    new ComposicaoLancamentosContabeis(balancete, responsavel)
            );
            checkStatusforDisableorEnableBtn(conciliacao);
            conciliacao.setStatus(StatusConciliacao.PROGRESS);
            contabeisService.update(conciliacao);
            Notification.show("CONCIALIAÇÃO EM ANDAMENTO");
            page.reload();
        });
        return dialog;
    }

    private ConfirmDialog getConfirmDialogEnd(ComposicaoLancamentosContabeis conciliacao) {
        ConfirmDialog dialog = new ConfirmDialog();
        UI ui = UI.getCurrent();
        Page page = ui.getPage();

        dialog.setHeader("Finalizar conciliação");
        dialog.setText("Você tem certeza que deseja finalizar? Essa alteração não pode ser desfeita.");
        dialog.setCancelable(true);
        dialog.setCancelText("Cancelar");
        dialog.setConfirmText("Confirmar");
        dialog.addConfirmListener(dialogEvent -> {
            conciliacao.setStatus(StatusConciliacao.CLOSED);
            contabeisService.update(conciliacao);
            Notification.show("CONCIALIAÇÃO FINALIZADA");
            page.reload();
        });
        return dialog;
    }


}