package br.com.clearcont.clearcontwebapp.models

import com.vaadin.flow.component.notification.Notification
import java.time.LocalDate
import java.time.Year
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalAdjusters
import java.util.*
import java.util.logging.Logger

open class ComposicaoLancamentos {
    var data: LocalDate = LocalDate.now()
    var saldoContabil: Double = 0.0
    open var dataVencimento: LocalDate? = LocalDate.now()
    open var diasVencidos = 0

    val dataFormated: String
        get() {
            val formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))
            return data.format(formatador)
        }
    private fun getFixedMonthValue(month: Int): Int = if (month in 1..12) month else 1

    open fun getDataVencimento(): String {
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        return dataVencimento!!.format(formatter)
    }

    open fun getDiasVencidos(month: Int): Int {
        calcularDiasVencidos(month)
        return diasVencidos
    }

    open fun calcularDiasVencidos(mes: Int) {
        val fixedMes = getFixedMonthValue(mes)
        val anoAtual = Year.now().value
        val ultimoDiaDoMes = LocalDate.of(anoAtual, fixedMes, 1).with(TemporalAdjusters.lastDayOfMonth())
        dataVencimento?.let {
            this.diasVencidos = ChronoUnit.DAYS.between(ultimoDiaDoMes, dataVencimento).toInt()

            if (diasVencidos < 0) {
                this.diasVencidos = -this.diasVencidos
            } else if (diasVencidos > 0) {
                this.diasVencidos = 0
            }
        }
    }

}
