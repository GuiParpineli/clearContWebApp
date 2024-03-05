package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerContabil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = 0L;
    private int numNotaFiscal = 0;
    private LocalDate dataVencimento;
    private Double ISS = 0.0;
    private Double INSS = 0.0;
    private Double IRRF = 0.0;
    private Double CSRF = 0.0;
    private int diasVencidos = 0;
    private StatusConciliacao status;

    @ToString.Exclude
    @OneToOne(mappedBy = "customerContabil", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private ComposicaoLancamentosContabeis composicaoLancamentosContabeis;

    public void calcularDiasVencidos() {
        LocalDate hoje = LocalDate.now();
        if (dataVencimento != null) {
            this.diasVencidos = (int) ChronoUnit.DAYS.between(dataVencimento, hoje);
        } else {
            this.diasVencidos = 0;
        }
    }

    public void setDiasVencidos() {
        calcularDiasVencidos();
    }

    public int getDiasVencidos() {
        calcularDiasVencidos();
        return diasVencidos;
    }

    public CustomerContabil(Long id,
                            int numNotaFiscal,
                            LocalDate dataVencimento,
                            Double ISS,
                            Double INSS,
                            Double IRRF,
                            Double CSRF,
                            ComposicaoLancamentosContabeis composicaoLancamentosContabeis) {
        this.id = id;
        this.numNotaFiscal = numNotaFiscal;
        this.dataVencimento = dataVencimento;
        this.ISS = ISS;
        this.INSS = INSS;
        this.IRRF = IRRF;
        this.CSRF = CSRF;
        this.composicaoLancamentosContabeis = composicaoLancamentosContabeis;
        calcularDiasVencidos();
    }

    public LocalDate getComposicaoData() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getData();
        } else {
            return LocalDate.now();
        }
    }

    public @NotNull String getComposicaoDebito() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getDebito();
        } else {
            return "0";
        }
    }

    public @NotNull String getComposicaoCredito() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getCredito();
        } else {
            return "0";
        }
    }

    public String getComposicaoHistorico() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getHistorico();
        } else {
            return "0";
        }
    }

    public void setComposicaoHistorico(String composicaoHistorico) {
        if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis.setHistorico(composicaoHistorico);
        } else {
            composicaoLancamentosContabeis = new ComposicaoLancamentosContabeis();
            composicaoLancamentosContabeis.setHistorico(composicaoHistorico);
        }
    }

    public void setComposicaoData(LocalDate composicaoData) {
        if (composicaoLancamentosContabeis == null) {
            composicaoLancamentosContabeis = new ComposicaoLancamentosContabeis();
        }
        composicaoLancamentosContabeis.setData(composicaoData);
    }

    public void setComposicaoDebito(String composicaoDebito) {
        if (composicaoLancamentosContabeis == null) {
            composicaoLancamentosContabeis = new ComposicaoLancamentosContabeis();
        }
        composicaoLancamentosContabeis.setDebito(composicaoDebito);
    }

    public void setComposicaoCredito(String composicaoCredito) {
        if (composicaoLancamentosContabeis == null) {
            composicaoLancamentosContabeis = new ComposicaoLancamentosContabeis();
        }
        composicaoLancamentosContabeis.setCredito(composicaoCredito);
    }

    public StatusConciliacao getStatus() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getStatus();
        } else {
            return StatusConciliacao.OPEN;
        }
    }


}