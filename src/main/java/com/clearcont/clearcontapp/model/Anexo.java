package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String ext;
    private Timestamp createdTime;
    @ManyToOne
    ComposicaoLancamentosContabeis composicaoLancamentosContabeis;
}