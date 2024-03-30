package br.com.clearcont.clearcontwebapp.helpers

import java.text.NumberFormat
import java.util.*

fun formatCurrencyBR(value: Double): String {
    val brLocale = Locale.of("pt", "BR")
    return NumberFormat.getCurrencyInstance(brLocale).format(value)
}
