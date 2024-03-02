package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.service.AnexoStorageServiceImpl;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.impl.ImmutableEmptyStyle;

import static com.clearcont.clearcontapp.helpers.DecimalFormatBR.getDecimalFormat;

public class InfoCardsConciliacao extends HorizontalLayout {
    FlexLayout diferencaLayout = new FlexLayout();
    Text diferencaText = new Text("0.00");

    public InfoCardsConciliacao(Balancete balancete, ComposicaoLancamentosContabeis conciliacao, double saldoContabil, AnexoStorageServiceImpl anexoStorageService) {

        Span nomeConta = new Span(balancete.getNomeConta());
        nomeConta.getStyle().set("font-weight", "800");
        FlexLayout laynomeConta = new FlexLayout(new Span("Nome da conta: "), nomeConta);

        Span numeroConta = new Span(String.valueOf(balancete.getNumeroConta()));
        numeroConta.getStyle().set("font-weight", "800");
        FlexLayout numConta = new FlexLayout(new Span("Numero da conta: "), numeroConta);

        Span status = new Span(conciliacao.getStatus().getName());
        status.getStyle().set("font-weight", "800");
        FlexLayout conciliacaoStatus = new FlexLayout(new Span("Status conciliação: "), status);

        Span saldo = new Span(getDecimalFormat().format(saldoContabil));
        saldo.getStyle().set("font-weight", "800");
        FlexLayout composicaoContabilFlex = new FlexLayout(new Span("Composição do Saldo Contabil: "), saldo);

        Span diferencaText = new Span((getDecimalFormat().format(balancete.getDoubleTotalBalancete() - saldoContabil)));
        diferencaText.getStyle().set("font-weight", "800");
        var newC = new HorizontalLayout(new Span("Diferença: "), diferencaText);
        diferencaLayout.replace(diferencaText, newC);

        FlexLayout infos = new FlexLayout(
                laynomeConta,
                numConta,
                conciliacaoStatus,
                composicaoContabilFlex,
                diferencaLayout
        );
        infos.addClassName("card");
        infos.setAlignItems(Alignment.START);
        infos.setFlexDirection(FlexLayout.FlexDirection.COLUMN);


        VerticalLayout flexLayout = new VerticalLayout(
                new H3("Documentos Anexados"),
                new DownloadComponent(anexoStorageService, conciliacao)
        );

        flexLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        flexLayout.addClassName("card");

        FlexLayout infosCards = new FlexLayout(flexLayout, infos);
        infosCards.getStyle().setPadding("10px");
        infosCards.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        infosCards.setFlexShrink(20);
        infosCards.setJustifyContentMode(FlexComponent.JustifyContentMode.EVENLY);

        add(infosCards);
    }

    public void updateDiferencaLayout(double saldoContabilBalancete, double saldoContabilDaGrid) {
        double diferenca = saldoContabilBalancete - saldoContabilDaGrid;
        diferencaText.setText("R$ " + (getDecimalFormat().format(diferenca)));
    }

}