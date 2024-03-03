package com.clearcont.clearcontapp.helpers;

import org.jetbrains.annotations.NotNull;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Periodo {
    static Locale locale = new Locale.Builder().setLanguage("pt").setRegion("BR").build();
    
    public static int getMonthByPeriodoString(@NotNull String periodo) {
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
    
    public static @NotNull String getMonthByInt(Integer i) {
        return Month.of(i).getDisplayName(TextStyle.FULL, locale);
    }
}