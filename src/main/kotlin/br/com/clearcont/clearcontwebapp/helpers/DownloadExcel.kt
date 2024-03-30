package br.com.clearcont.clearcontwebapp.helpers

import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Anchor
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.server.StreamResource

object DownloadExcel {
    fun generateExcelDownloadLink(excelStreamResource: StreamResource?): Anchor {
        val downloadLink = Anchor(excelStreamResource, "")
        downloadLink.element.setAttribute("download", true)
        val exportButton = Button("Exportar para Excel")
        exportButton.style.setBackground("darkgreen")
        downloadLink.add(exportButton)
        exportButton.icon = Icon("download")
        exportButton.element.setAttribute("download", true)
        exportButton.element.setAttribute("href", excelStreamResource)
        return downloadLink
    }
}
