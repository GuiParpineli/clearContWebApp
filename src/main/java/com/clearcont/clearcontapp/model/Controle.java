package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Controle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<ComposicaoLancamentosContabeis> lancamentosContabeis;
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
