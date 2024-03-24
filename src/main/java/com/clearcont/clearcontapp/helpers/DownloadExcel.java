package com.clearcont.clearcontapp.helpers;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.server.StreamResource;
import org.jetbrains.annotations.NotNull;

public abstract class DownloadExcel {
    @NotNull
    public static Anchor generateExcelDownloadLink(StreamResource excelStreamResource) {
        Anchor downloadLink = new Anchor(excelStreamResource, "");
        downloadLink.getElement().setAttribute("download", true);
        Button exportButton = new Button("Exportar para Excel");
        exportButton.getStyle().setBackground("darkgreen");
        downloadLink.add(exportButton);
        exportButton.setIcon(new Icon("download"));
        exportButton.getElement().setAttribute("download", true);
        exportButton.getElement().setAttribute("href", excelStreamResource);
        return downloadLink;
    }

}
