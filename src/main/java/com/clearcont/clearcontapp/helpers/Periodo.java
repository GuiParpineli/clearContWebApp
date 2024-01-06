package com.clearcont.clearcontapp.helpers;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

public class Periodo {
    static LocalDate localDate = LocalDate.now();
    static Locale locale = new Locale.Builder().setLanguage("pt").setRegion("BR").build();
    static String month = localDate.getMonth().getDisplayName(TextStyle.FULL, locale).toUpperCase();
    public static String periodo = month;
    
    public static int getMonthByPeriodoString() {
        return switch (periodo) {
            case "JANEIRO" -> 1;
            case "FEVEREIRO" -> 2;
            case "MARÇO" -> 3;
            case "ABRIL" -> 4;
            case "MARIO" -> 5;
            case "JUNHO" -> 6;
            case "JULHO" -> 7;
            case "AGOSTO" -> 8;
            case "SETEMBRO" -> 9;
            case "OUTUBRO" -> 10;
            case "NOVEMBRO" -> 11;
            case "DEZEMBRO" -> 12;
            default -> throw new IllegalStateException("Unexpected value: " + periodo);
        };
    }
}
