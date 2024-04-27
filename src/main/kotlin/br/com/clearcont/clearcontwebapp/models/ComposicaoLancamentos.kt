package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import com.vaadin.flow.component.notification.Notification
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.logging.Logger

open class ComposicaoLancamentos {
    var data: LocalDate = LocalDate.now()
    private var debito: Double = 0.0
    private var credito: Double = 0.0
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

    fun setDebito(value: Double) {
        this.debito = value
    }

    fun setDebito(debito: String) {
        val log = Logger.getLogger(javaClass.name)
        try {
            this.debito = debito.replace("R$", "").replace(".", "").replace(",", ".").trim().toDouble()
            this.saldoContabil = this.debito - credito
        } catch (e: NumberFormatException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun setCredito(credito: String) {
        val log = Logger.getLogger(javaClass.name)
        try {
            this.credito = credito.replace("R$", "").replace(".", "").replace(",", ".").trim().toDouble()
            this.saldoContabil = this.debito - this.credito
        } catch (e: NumberFormatException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun getDebito(): String {
        return formatCurrencyBR(debito)
    }

    fun getCredito(): String {
        return formatCurrencyBR(credito)
    }

    fun getSaldoContabil(): String {
        return formatCurrencyBR(saldoContabil)
    }

    fun setCredito(value: Double) {
        this.credito = value
    }

}
