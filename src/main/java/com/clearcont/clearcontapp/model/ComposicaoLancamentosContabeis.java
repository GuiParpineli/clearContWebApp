package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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
    @Setter
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate data;
    @Setter
    private String historico;
    @NotNull
    private Double debito = 0.0;
    @NotNull
    private Double credito = 0.0;
    private Double saldoContabil = debito - credito;
    private String status = "EM ABERTO";
    @ManyToOne
    @Setter
    private Balancete balancete;
    
    public void setDebito(Double debito) {
        this.debito = debito;
        this.saldoContabil = debito - credito;
    }
    
    public void setCredito(Double credito) {
        this.credito = credito;
        this.saldoContabil = debito - credito;
    }
    
}
