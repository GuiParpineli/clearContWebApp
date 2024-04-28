package br.com.clearcont.clearcontwebapp.models

import com.vaadin.flow.component.notification.Notification
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.logging.Logger

open class ComposicaoLancamentos {
    var data: LocalDate = LocalDate.now()
    var saldoContabil: Double = 0.0

    fun contarPontos(texto: String): Int {
        var contador = 0
        for (element in texto) {
            if (element == '.') {
                contador++
            }
        }
        return contador
    }

    val dataFormated: String
        get() {
            val formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))
            return data.format(formatador)
        }


}
