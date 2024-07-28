package br.com.clearcont.clearcontwebapp.utils.helpers

import java.text.NumberFormat
import java.text.ParseException
import java.text.ParsePosition
import java.util.*

val brLocale = Locale.of("pt", "BR")!!

fun formatCurrencyBR(value: Double): String {
    return NumberFormat.getCurrencyInstance(brLocale).format(value)
}

fun unformatCurrencyBR(formattedCurrency: String): Double {
    val numberFormat = NumberFormat.getCurrencyInstance(brLocale)
    val parsePosition = ParsePosition(0)
    val number = numberFormat.parse(formattedCurrency, parsePosition)
    if (parsePosition.index != formattedCurrency.length) {
        throw ParseException("Unrecognized format", parsePosition.errorIndex)
    }
    return number?.toDouble() ?: throw ParseException("Parse result is null", parsePosition.errorIndex)
}
