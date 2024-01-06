package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Balancete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Empresa empresa;
    private String nomeConta;
    private int numeroConta;
    private Double totalBalancete;
    private String classificacao;
    private String mes;
    private Integer ano;
}
