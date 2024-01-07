package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDateTime data = LocalDateTime.now();
    @Setter
    private String historico;
    @NotNull
    private Double debito = 0.0;
    @NotNull
    private Double credito = 0.0;
    private Double saldoContabil = credito - debito;
    private String status;
    @ManyToOne
    private Balancete balancete;
    
    public String getData() {
        return data.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }
    
    public void setDebito(Double debito) {
        this.debito = debito;
        this.saldoContabil = credito - debito;
    }
    
    public void setCredito(Double credito) {
        this.credito = credito;
        this.saldoContabil = credito - debito;
    }
}
