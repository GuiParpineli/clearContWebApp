package com.clearcont.clearcontapp.model;

import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
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
    private String nomeResponsavel;
    @ManyToOne
    private Empresa empresa;
    
    public Double getDoubleSaldoBalancete() {
        return saldoBalancete;
    }
    
    public Double getDoubleSaldoAnalise() {
        return saldoAnalise;
    }
    
    public Double getDoubleValorDiferenca() {
        return valorDiferenca;
    }
    
    public @NotNull String getSaldoBalancete() {
        return DecimalFormatBR.getDecimalFormat().format(saldoBalancete);
    }
    
    public @NotNull String getSaldoAnalise() {
        return DecimalFormatBR.getDecimalFormat().format(saldoAnalise);
    }
    
    public @NotNull String getValorDiferenca() {
        return DecimalFormatBR.getDecimalFormat().format(valorDiferenca);
    }
}