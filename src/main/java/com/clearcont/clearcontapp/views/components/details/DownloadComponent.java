package com.clearcont.clearcontapp.views.components.details;

import com.clearcont.clearcontapp.model.Anexo;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.InputStreamMultipartFile;
import com.clearcont.clearcontapp.service.AnexoStorageServiceImpl;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.server.StreamResource;
import elemental.json.Json;
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
    private final String companyName;

    public DownloadComponent(AnexoStorageServiceImpl anexoStorageService, ComposicaoLancamentosContabeis lancamentosContabeis, String companyName) {
        this.anexoStorageService = anexoStorageService;
        this.lancamentosContabeis = lancamentosContabeis;
        this.companyName = companyName;
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
        MultiFileMemoryBuffer multiFileMemoryBuffer = new MultiFileMemoryBuffer();
        Upload multiFileUpload = new Upload(multiFileMemoryBuffer);

//        multiFileUpload.setAcceptedFileTypes(".pdf", ".docx", ".png", ".jpeg", ".xls",);
        multiFileUpload.setUploadButton(new Button("Upload File"));
        multiFileUpload.setDropAllowed(true);
        Div arrasteOsArquivosAqui = new Div(new Text("Arraste os arquivos aqui"));
        multiFileUpload.setDropLabel(arrasteOsArquivosAqui);

        multiFileUpload.addSucceededListener(event -> {
            InputStream inputStream;
            try {
                inputStream = multiFileMemoryBuffer.getInputStream(event.getFileName());
                MultipartFile multipartFile = new InputStreamMultipartFile(inputStream, event.getFileName());
                anexoStorageService.saveFile(multipartFile, lancamentosContabeis, companyName);
                Notification.show("Arquivo Anexado");
                addDownloadButtons(lancamentosContabeis.getId());

                // Aqui para limpar o campo após o upload
                multiFileUpload.getElement().setPropertyJson("files", Json.createArray());
            } catch (IOException e) {
                Notification.show("Falha no upload", 3000, Notification.Position.MIDDLE);
            }
        });

        return multiFileUpload;
    }

    private void addDownloadButtons(Long composicaoId) {
        downloadButtonsLayout.removeAll();

        List<HorizontalLayout> downloadButtons = updateFileList(composicaoId);
        downloadButtons.forEach(downloadButtonsLayout::add);
    }

    private List<HorizontalLayout> updateFileList(Long composicaoId) {
        List<Anexo> anexos = anexoStorageService.getAnexosByComposicao(composicaoId);
        List<HorizontalLayout> fileLayouts = new ArrayList<>();
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

            Button removeButton = new Button("Remover", new Icon(VaadinIcon.TRASH));
            removeButton.addClickListener(event -> {
                anexoStorageService.deleteFile(anexo.getId(), companyName);
                Notification.show("Arquivo removido");
                addDownloadButtons(composicaoId);
            });

            HorizontalLayout layout = new HorizontalLayout(downloadLink, removeButton);
            fileLayouts.add(layout);
        }
        return fileLayouts;
    }
}