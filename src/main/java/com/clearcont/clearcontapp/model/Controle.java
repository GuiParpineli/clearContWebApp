package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
public class Controle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subGrupo;
    private String circulante;
    private String nomeConta;
    private Double saldoBalancete;
    private Double saldoAnalise;
    private Double valorDiferenca;
    private String statusGeralConciliacao;
    private String observacoes;
    private Boolean composicaoPreenchida;
    private Boolean agingListadaPendencia;
    private LocalDate dataCompetencia;
    @ManyToOne
    private Responsavel responsavel;
    @ManyToOne
    private Empresa empresa;
}
