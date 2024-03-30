package br.com.clearcont.clearcontwebapp.helpers

import java.time.Month
import java.time.format.TextStyle
import java.util.*

object Periodo {
    private var locale: Locale = Locale.Builder().setLanguage("pt").setRegion("BR").build()

    fun getMonthByPeriodoString(periodo: String): Int {
        return when (periodo) {
            "JANEIRO" -> 1
            "FEVEREIRO" -> 2
            "MARÇO" -> 3
            "ABRIL" -> 4
            "MARIO" -> 5
            "JUNHO" -> 6
            "JULHO" -> 7
            "AGOSTO" -> 8
            "SETEMBRO" -> 9
            "OUTUBRO" -> 10
            "NOVEMBRO" -> 11
            "DEZEMBRO" -> 12
            else -> throw IllegalStateException("Unexpected value: $periodo")
        }
    }

    fun getMonthByInt(i: Int?): String {
        return Month.of(i!!).getDisplayName(TextStyle.FULL, locale)
    }
}
