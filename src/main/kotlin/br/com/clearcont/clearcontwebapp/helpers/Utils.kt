package br.com.clearcont.clearcontwebapp.helpers

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
