package br.com.clearcont.clearcontwebapp.utils.helpers

import br.com.clearcont.clearcontwebapp.models.Empresa
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.notification.NotificationVariant
import org.apache.poi.ss.usermodel.Workbook
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.IOException

fun writeWorkbookToByteArrayInputStream(workbook: Workbook, log: java.util.logging.Logger): ByteArrayInputStream {
    ByteArrayOutputStream().use {
        try {
            workbook.write(it)
        } catch (e: IOException) {
            log.info(e.message)
        }
        return ByteArrayInputStream(it.toByteArray())
    }
}

fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?, month: String?) {
    if (empresa == null || month == null || empresa.nomeEmpresa == null) {
        Notification.show("Selecione uma empresa e periodo").apply {
            addThemeVariants(NotificationVariant.LUMO_WARNING)
            duration = 2000
            position = Notification.Position.TOP_CENTER
        }
        UI.getCurrent().navigate("/")
    }
}
