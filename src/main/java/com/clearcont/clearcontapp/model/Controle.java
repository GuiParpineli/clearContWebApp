package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;

@Entity
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
    @ManyToOne
    private Responsavel responsavel;
    @ManyToOne
    private Cliente cliente;
}
