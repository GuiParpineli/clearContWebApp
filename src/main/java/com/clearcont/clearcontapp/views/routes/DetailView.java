package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.DocumentosAnexados;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
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
import java.util.ArrayList;
import java.util.List;

@Route(value = "detail", layout = MainLayout.class)
public class DetailView extends VerticalLayout implements HasUrlParameter<String> {
    
    private final String CLASS_NAME = DetailView.class.getSimpleName();
    private final BalanceteService service;
    private final ComposicaoLancamentosContabeisRepository contabeisRepository;
    
    @Autowired
    public DetailView(BalanceteService service, ComposicaoLancamentosContabeisRepository contabeisRepository) {
        this.service = service;
        this.contabeisRepository = contabeisRepository;
    }
    
    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        Integer balanceteId = Integer.parseInt(parameter);
        Balancete balancete = service.getById(balanceteId);
        List<DocumentosAnexados> documentosAnexadosList = new ArrayList<>();
        
        List<Button> buttonsDownload = null;
        Button button = new Button("Baixar");
        button.addClassName("button");
        Icon iconExcel = new Icon("file-table");
        iconExcel.setColor("black");
        VerticalLayout buttonIcon = new VerticalLayout(iconExcel, button);
        buttonIcon.setAlignItems(Alignment.CENTER);
        
        MemoryBuffer memoryBuffer = new MemoryBuffer();
        Upload singleFileUpload = new Upload(memoryBuffer);
        
        singleFileUpload.addSucceededListener(click -> {
            // Get information about the uploaded file
            InputStream fileData = memoryBuffer.getInputStream();
            String fileName = click.getFileName();
            long contentLength = click.getContentLength();
            String mimeType = click.getMIMEType();
            // Do something with the file data
            // processFile (fileData, fileName, contentLength, mimeType);
            Notification.show("Arquivo Anexado");
        });
        
        HorizontalLayout dowloadButtons = new HorizontalLayout(
                buttonIcon,
                new VerticalLayout(
                        new H3("Anexar novo documento:"),
                        singleFileUpload
                )
        );
        
        dowloadButtons.setPadding(true);
        
        HorizontalLayout flexLayout = new HorizontalLayout(
                new H3("Documentos Anexados"),
                dowloadButtons
        );
        flexLayout.setAlignItems(Alignment.CENTER);
        flexLayout.addClassName("card");
        
        ComposicaoLancamentosContabeis conciliacao = contabeisRepository.findById(balanceteId).orElse(
                new ComposicaoLancamentosContabeis()
        );
        Log.log(CLASS_NAME, "TAMANHO COMPOSICAO LANCAMENTOS CONTABEIS: " + conciliacao.getId());
        
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
        
        double saldoContabil = getSaldoContabil(balanceteId);
        Text saldo = new Text(String.valueOf(saldoContabil));
        FlexLayout composicaoContabilFlex = new FlexLayout(
                new Text("Composição do Saldo Contabil: "),
                saldo
        );
        
        FlexLayout diferencaLayout = new FlexLayout(
                new Text("Diferença: "),
                new Text(String.valueOf(balancete.getTotalBalancete() - saldoContabil))
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
        
        FlexLayout infosCards = new FlexLayout(flexLayout, infos);
        infosCards.getStyle().setPadding("10px");
        infosCards.setFlexWrap(FlexLayout.FlexWrap.WRAP);
        infosCards.setFlexShrink(20);
        infosCards.setJustifyContentMode(JustifyContentMode.EVENLY);
        
        GridCrud<ComposicaoLancamentosContabeis> crud = new GridCrud<>(ComposicaoLancamentosContabeis.class);
        DefaultCrudFormFactory<ComposicaoLancamentosContabeis> formFactory = new DefaultCrudFormFactory<>(ComposicaoLancamentosContabeis.class);
        formFactory.setVisibleProperties("data", "debito", "credito", "historico");
        crud.setCrudFormFactory(formFactory);
        crud.getGrid().setColumns("data", "debito", "credito", "saldoContabil", "historico");
        crud.getGrid().getColumnByKey("saldoContabil")
                .setFooter(
                        "TOTAL SALDO: " +
                        saldoContabil
                );
        ;
        crud.getGrid().setColumnReorderingAllowed(true);
        setSizeFull();
        crud.getCrudFormFactory().setUseBeanValidation(true);
        crud.setFindAllOperation(() ->
                contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(balanceteId)
        );
        crud.setAddOperation(a -> {
                    a.setBalancete(balancete);
                    contabeisRepository.save(a);
                    return a;
                }
        );
        crud.setDeleteOperation(contabeisRepository::delete);
        crud.setUpdateOperation(contabeisRepository::saveAndFlush);
        
        VerticalLayout conciliacaoContabil = new VerticalLayout(new H1("Conciliação Contábil"), infosCards, crud);
        conciliacaoContabil.setAlignItems(Alignment.CENTER);
        
        add(conciliacaoContabil);
    }
    
    private double getSaldoContabil(Integer balanceteId) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(balanceteId)
                .stream().mapToDouble(ComposicaoLancamentosContabeis::getSaldoContabil).sum();
    }
    
}