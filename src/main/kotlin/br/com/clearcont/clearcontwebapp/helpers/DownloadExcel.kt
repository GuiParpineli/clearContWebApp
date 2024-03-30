package br.com.clearcont.clearcontwebapp.helpers

import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Anchor
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.server.StreamResource

fun generateExcelDownloadLink(excelStreamResource: StreamResource?): Anchor {
    val exportButton = Button("Exportar para Excel").apply {
        style.setBackground("darkgreen")
        icon = Icon("download")
        element.setAttribute("download", true)
        element.setAttribute("href", excelStreamResource)
    }
    val downloadLink = Anchor(excelStreamResource, "").apply {
        element.setAttribute("download", true)
        add(exportButton)
    }
    return downloadLink
}
