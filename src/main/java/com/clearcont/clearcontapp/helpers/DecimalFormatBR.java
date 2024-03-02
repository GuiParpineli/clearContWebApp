package com.clearcont.clearcontapp.helpers;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

public class DecimalFormatBR {
    public static DecimalFormat getDecimalFormat() {
        DecimalFormat formatter = new DecimalFormat("R$ #,###.##");
        DecimalFormatSymbols s = new DecimalFormatSymbols();
        s.setDecimalSeparator(',');
        s.setGroupingSeparator('.');
        formatter.setDecimalFormatSymbols(s);
        return formatter;
    }
}