package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

import static com.clearcont.clearcontapp.helpers.DecimalFormatBR.getDecimalFormat;

public class InfoCardsConciliacao extends HorizontalLayout {
    public InfoCardsConciliacao(Balancete balancete, ComposicaoLancamentosContabeis conciliacao, double saldoContabil) {
        
        Text nomeConta = new Text(balancete.getNomeConta());
        
        FlexLayout laynomeConta = new FlexLayout(
                new Text("Nome da conta: "),
                nomeConta
        );
        
        Text numeroConta = new Text(String.valueOf(balancete.getNumeroConta()));
        FlexLayout numConta = new FlexLayout(
                new Text("Numero da conta: "),
                numeroConta
        );
        
        Text status = new Text(conciliacao.getStatus());
        FlexLayout conciliacaoStatus = new FlexLayout(
                new Text("Status conciliação: "),
                status
        );
        
        Text saldo = new Text(getDecimalFormat().format( saldoContabil));
        FlexLayout composicaoContabilFlex = new FlexLayout(
                new Text("Composição do Saldo Contabil: "),
                 saldo
        );
        FlexLayout diferencaLayout = new FlexLayout(
                new Text("Diferença: "),
                new Text("R$ " + (getDecimalFormat().format(balancete.getDoubleTotalBalancete() - saldoContabil)))
        );
        
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
        HorizontalLayout flexLayout = new HorizontalLayout(
                new H3("Documentos Anexados"),
                new DownloadComponent()
        );
        flexLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        flexLayout.addClassName("card");
        FlexLayout infosCards = new FlexLayout(flexLayout, infos);
        infosCards.getStyle().
                
                setPadding("10px");
        infosCards.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        infosCards.setFlexShrink(20);
        infosCards.setJustifyContentMode(FlexComponent.JustifyContentMode.EVENLY);
        add(infosCards);
    }
    
}
