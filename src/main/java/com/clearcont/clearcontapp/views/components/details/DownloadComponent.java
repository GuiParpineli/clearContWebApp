package com.clearcont.clearcontapp.views.components.details;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;

import java.io.InputStream;
import java.util.List;

public class DownloadComponent extends HorizontalLayout {
    public DownloadComponent() {
        
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
        
        List<Button> buttonsDownload = null;
        Button button = new Button("Baixar");
        button.addClassName("button");
        Icon iconExcel = new Icon("file-table");
        iconExcel.setColor("black");
        
        VerticalLayout buttonIcon = new VerticalLayout(iconExcel, button);
        buttonIcon.setAlignItems(Alignment.CENTER);
        add(
                buttonIcon,
                new VerticalLayout(
                        new H3("Anexar novo documento:"),
                        singleFileUpload
                )
        );
        
    }
}
