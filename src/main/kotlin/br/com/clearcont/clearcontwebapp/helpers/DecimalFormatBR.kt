package br.com.clearcont.clearcontwebapp.helpers

import java.text.DecimalFormat
import java.text.DecimalFormatSymbols

object DecimalFormatBR {
    val decimalFormat: DecimalFormat
        get() {
            val formatter = DecimalFormat("R$ #,###.##")
            val s = DecimalFormatSymbols()
            s.decimalSeparator = ','
            s.groupingSeparator = '.'
            formatter.decimalFormatSymbols = s
            return formatter
        }
}
