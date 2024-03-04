package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.*;
import com.clearcont.clearcontapp.repository.ResponsavelRepository;
import com.clearcont.clearcontapp.service.AnexoStorageServiceImpl;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.service.ComposicaoLancamentosContabeisService;
import com.clearcont.clearcontapp.views.components.details.BalanceteDetailsLayout;
import com.clearcont.clearcontapp.views.components.details.GridConciliar;
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
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Route(value = "conciliar", layout = MainLayout.class)
@PermitAll
@Slf4j
@PageTitle("Conciliar")
public class ConciliarView extends VerticalLayout implements HasUrlParameter<String> {

    private final BalanceteService service;
    private final ComposicaoLancamentosContabeisService contabeisService;
    private final AnexoStorageServiceImpl anexoStorageService;
    private final ResponsavelRepository responsavelRepository;
    @NotNull Button startBtn = getStartBtn();
    @NotNull Button finishBtn = getFinishBtn();

    @Autowired
    public ConciliarView(BalanceteService service, ComposicaoLancamentosContabeisService contabeisService, AnexoStorageServiceImpl anexoStorageService, ResponsavelRepository responsavelRepository) {
        this.service = service;
        this.contabeisService = contabeisService;
        this.anexoStorageService = anexoStorageService;
        this.responsavelRepository = responsavelRepository;
    }

    @Override
    public void setParameter(BeforeEvent event, @NotNull String parameter) {
        CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
        Long balanceteId = Long.parseLong(parameter);
        Balancete balancete = service.getById(balanceteId);
        log.info("BALANCETE ID: " + balanceteId);
        log.info("BALANCETE NOME DA CONTA: " + balancete.getNomeConta());

        HorizontalLayout btns = new HorizontalLayout(startBtn, finishBtn);

        List<ComposicaoLancamentosContabeis> conciliacaoList = contabeisService.getByBalanceteID(balanceteId);
        if (conciliacaoList.isEmpty()) {
            conciliacaoList = List.of(new ComposicaoLancamentosContabeis());
            contabeisService.update(conciliacaoList.getFirst());
        }
        double saldoContabil = contabeisService.getSaldoContabil(balanceteId);

        ComposicaoLancamentosContabeis conciliacao = conciliacaoList.getLast();
        BalanceteDetailsLayout infoCards = new BalanceteDetailsLayout(balancete, conciliacao, saldoContabil, anexoStorageService);
        GridConciliar crud = new GridConciliar(balancete, contabeisService, balanceteId, responsavelRepository, infoCards);
        checkStatusforDisableorEnableBtn(conciliacao);

        crud.setEnabled(!conciliacao.getStatus().equals(StatusConciliacao.OPEN) && !conciliacao.getStatus().equals(StatusConciliacao.CLOSED));

        Responsavel responsavel = responsavelRepository.findById(cookieFactory.getCookieInteger("responsavel-id")).orElseThrow();
        log.info("RESPONSAVEL NOME: " + responsavel.getNome());
        ConfirmDialog dialogStart = getConfirmDialogStart(conciliacao, balancete, responsavel);
        ConfirmDialog dialogEnd = getConfirmDialogEnd(conciliacao);

        startBtn.addClickListener(click -> dialogStart.open());
        finishBtn.addClickListener(click -> dialogEnd.open());

        log.info("ID COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());

        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infoCards, btns, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);

        add(conciliacaoContabil);
    }

    private void checkStatusforDisableorEnableBtn(@NotNull ComposicaoLancamentosContabeis conciliacao) {
        if (conciliacao.getStatus().equals(StatusConciliacao.PROGRESS) || conciliacao.getStatus().equals(StatusConciliacao.CLOSED)) {
            startBtn.getElement().setEnabled(false);
        }

        if (conciliacao.getStatus().equals(StatusConciliacao.OPEN) || conciliacao.getStatus().equals(StatusConciliacao.CLOSED)) {
            finishBtn.getElement().setEnabled(false);
        }
    }

    private @NotNull Button getStartBtn() {
        Button startBtn = new Button("Iniciar Conciliação");
        startBtn.setIcon(new Icon("calc"));
        startBtn.getStyle().setBackground("#0fc90f");
        return startBtn;
    }

    private @NotNull Button getFinishBtn() {
        Button finishBtn = new Button("Fechar Conciliação");
        finishBtn.setIcon(new Icon("chevron-down"));
        finishBtn.getStyle().setBackground("#ff4000c2");
        return finishBtn;
    }

    private @NotNull ConfirmDialog getConfirmDialogStart(@NotNull ComposicaoLancamentosContabeis conciliacao, Balancete balancete, Responsavel responsavel) {
        ConfirmDialog dialog = new ConfirmDialog();
        UI ui = UI.getCurrent();
        Page page = ui.getPage();

        dialog.setHeader("Iniciar conciliação");
        dialog.setText("Você tem certeza que deseja iniciar? Essa alteração não pode ser desfeita.");
        dialog.setCancelable(true);
        dialog.setCancelText("Cancelar");
        dialog.setConfirmText("Confirmar");
        dialog.addConfirmListener(dialogEvent -> {
            if (conciliacao.getResponsavel() == null) {
                contabeisService.saveWithCustomer(new ComposicaoLancamentosContabeis(balancete, responsavel), new CustomerContabil());
            }
            checkStatusforDisableorEnableBtn(conciliacao);
            conciliacao.setStatus(StatusConciliacao.PROGRESS);
            contabeisService.update(conciliacao);
            Notification.show("CONCIALIAÇÃO EM ANDAMENTO");
            page.reload();
        });
        return dialog;
    }

    private @NotNull ConfirmDialog getConfirmDialogEnd(@NotNull ComposicaoLancamentosContabeis conciliacao) {
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