package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.service.AnexoStorageServiceImpl;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.Style;

import static com.clearcont.clearcontapp.helpers.DecimalFormatBR.getDecimalFormat;


public class BalanceteDetailsLayout extends HorizontalLayout {
    FlexLayout diferencaLayout = new FlexLayout();
    Text diferencaValue = new Text("0.00");

    public BalanceteDetailsLayout(Balancete balancete, ComposicaoLancamentosContabeis conciliacao, double saldoContabil, AnexoStorageServiceImpl anexoStorageService) {
        FlexLayout accountName = createStyledLayout("Nome da conta: ", balancete.getNomeConta());
        FlexLayout accountNumber = createStyledLayout("Numero da conta: ", String.valueOf(balancete.getNumeroConta()));
        FlexLayout conciliationStatusLabel = createStyledLayout("Status conciliação: ", conciliacao.getStatus().getName());
        FlexLayout composicaoSaldoLayout = createStyledLayout("Composição do Saldo Contábil: ", getDecimalFormat().format(saldoContabil));

        Span differenceSpan = new Span(getDecimalFormat().format(balancete.getDoubleTotalBalancete() - saldoContabil));
        differenceSpan.getStyle().set("font-weight", "800").set("padding-left", "5px");
        var newC = new HorizontalLayout(new Span("Diferença: "), differenceSpan);
        diferencaLayout.replace(diferencaValue, newC);

        FlexLayout infos = new FlexLayout(
                accountName,
                accountNumber,
                conciliationStatusLabel,
                composicaoSaldoLayout,
                diferencaLayout
        );
        infos.addClassName("card");
        infos.setAlignItems(Alignment.START);
        infos.setFlexDirection(FlexLayout.FlexDirection.COLUMN);

        H3 documentosAnexadosTitle = new H3("Documentos Anexados");
        documentosAnexadosTitle.getStyle().setTextAlign(Style.TextAlign.CENTER);
        Div documentosAnexadosDiv = new Div(
                documentosAnexadosTitle,
                new DownloadComponent(anexoStorageService, conciliacao, balancete.getEmpresa().getNomeEmpresa())
        );
        documentosAnexadosDiv.addClassName("card");
        documentosAnexadosDiv.setMinWidth("200px");
        FlexLayout infosCards = new FlexLayout(documentosAnexadosDiv, infos);
        infosCards.getStyle().setPadding("10px");
        infosCards.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        infosCards.setFlexShrink(20);
        infosCards.setJustifyContentMode(JustifyContentMode.AROUND);
        add(infosCards);
    }

    public void updateDiferencaLayout(double saldoContabilBalancete, double saldoContabilDaGrid) {
        double diferenca = saldoContabilBalancete - saldoContabilDaGrid;
        diferencaValue.setText("R$ " + (getDecimalFormat().format(diferenca)));
    }

    private FlexLayout createStyledLayout(String label, String value) {
        Span span = new Span(value);
        span.getStyle().set("font-weight", "800").set("padding-left", "5px");
        return new FlexLayout(new Span(label), span);
    }
}