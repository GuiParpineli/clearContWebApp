package com.clearcont.clearcontapp.model;

import lombok.Getter;

@Getter
public enum StatusConciliacao {
    OPEN("ABERTO"), PROGRESS("EM ANDAMENTO"), CLOSED("FINALIZADO");
    final String name;
    
    StatusConciliacao(String name) {
        this.name = name;
    }
}
