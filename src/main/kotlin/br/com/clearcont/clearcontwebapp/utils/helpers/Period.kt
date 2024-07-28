package br.com.clearcont.clearcontwebapp.utils.helpers

import java.time.Month
import java.time.format.TextStyle
import java.util.*

object Period {
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

    fun getPortugueseMonthName(month: Month): String {
        return when (month) {
            Month.JANUARY -> "JANEIRO"
            Month.FEBRUARY -> "FEVEREIRO"
            Month.MARCH -> "MARÇO"
            Month.APRIL -> "ABRIL"
            Month.MAY -> "MAIO"
            Month.JUNE -> "JUNHO"
            Month.JULY -> "JULHO"
            Month.AUGUST -> "AGOSTO"
            Month.SEPTEMBER -> "SETEMBRO"
            Month.OCTOBER -> "OUTUBRO"
            Month.NOVEMBER -> "NOVEMBRO"
            Month.DECEMBER -> "DEZEMBRO"
        }
    }

    fun getMonthByInt(i: Int?): String {
        return Month.of(i!!).getDisplayName(TextStyle.FULL, locale)
    }
}
