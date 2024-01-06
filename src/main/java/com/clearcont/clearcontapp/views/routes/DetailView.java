package com.clearcont.clearcontapp.views.routes;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.DocumentosAnexados;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Route(value = "detail", layout = MainLayout.class)
public class DetailView extends VerticalLayout implements HasUrlParameter<String> {
    
    private final BalanceteService service;
    
    @Autowired
    public DetailView(BalanceteService service) {
        this.service = service;
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
        
        Grid<Balancete> grid = new Grid<>(Balancete.class, false);
        grid.setItems(balancete);
        
        
        add(new VerticalLayout(new H1("Conciliação Contábil"), flexLayout, grid));
    }
}