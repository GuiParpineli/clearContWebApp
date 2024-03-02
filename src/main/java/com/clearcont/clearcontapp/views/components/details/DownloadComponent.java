package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Anexo;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.InputStreamMultipartFile;
import com.clearcont.clearcontapp.service.AnexoStorageServiceImpl;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.List;

public class DownloadComponent extends HorizontalLayout {
    private VerticalLayout downloadButtonsLayout = new VerticalLayout();

    private final AnexoStorageServiceImpl anexoStorageService;
    private final ComposicaoLancamentosContabeis lancamentosContabeis;

    public DownloadComponent(AnexoStorageServiceImpl anexoStorageService, ComposicaoLancamentosContabeis lancamentosContabeis) {
        this.anexoStorageService = anexoStorageService;
        this.lancamentosContabeis = lancamentosContabeis;
        Upload singleFileUpload = getUpload();

        this.downloadButtonsLayout = new VerticalLayout();
        addDownloadButtons(lancamentosContabeis.getId());
        add(
                this.downloadButtonsLayout,
                new VerticalLayout(
                        new H3("Anexar novo documento:"),
                        singleFileUpload
                )
        );
    }

    private Upload getUpload() {
        MemoryBuffer memoryBuffer = new MemoryBuffer();
        Upload singleFileUpload = new Upload(memoryBuffer);
        singleFileUpload.addFinishedListener(event -> {
            try {
                InputStream in = memoryBuffer.getInputStream();
                MultipartFile multipartFile = new InputStreamMultipartFile(in, event.getFileName());
                anexoStorageService.saveFile(multipartFile, lancamentosContabeis);
                Notification.show("Arquivo Anexado");

                addDownloadButtons(lancamentosContabeis.getId());
            } catch (IOException e) {
                Notification.show("Falha no upload", 3000, Notification.Position.MIDDLE);
            }
        });
        return singleFileUpload;
    }

    private void addDownloadButtons(Long composicaoId) {
        downloadButtonsLayout.removeAll();

        List<Anchor> downloadButtons = updateFileList(composicaoId);
        downloadButtons.forEach(downloadButtonsLayout::add);
    }

    private List<Anchor> updateFileList(Long composicaoId) {
        List<Anexo> anexos = anexoStorageService.getAnexosByComposicao(composicaoId);
        List<Anchor> downloadButtons = new ArrayList<>();
        for (Anexo anexo : anexos) {
            Anchor downloadLink = new Anchor();
            StreamResource resource = new StreamResource(anexo.getName(), () -> {
                try {
                    return anexoStorageService.loadFileAsResource(anexo.getName(), anexo.getExt()).getInputStream();
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });

            downloadLink.setHref(resource);
            downloadLink.getElement().setAttribute("download", true);
            Button downloadButton = new Button("Baixar " + anexo.getName() + "." + anexo.getExt(), new Icon(VaadinIcon.DOWNLOAD_ALT));
            downloadLink.add(downloadButton);
            downloadButtons.add(downloadLink);
        }
        return downloadButtons;
    }
}