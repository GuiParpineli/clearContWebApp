package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CustomerContabil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = 0L;
    private int numNotaFiscal = 0;
    private LocalDate dataVencimento = LocalDate.now();
    private Double ISS = 0.0;
    private Double INSS = 0.0;
    private Double IRRF = 0.0;
    private Double CSRF = 0.0;
    private int diasVencidos = 0;
    private StatusConciliacao status;

    @ToString.Exclude
    @OneToOne(mappedBy = "customerContabil", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private ComposicaoLancamentosContabeis composicaoLancamentosContabeis;

    public void calcularDiasVencidos(int mes) {
        int anoAtual = Year.now().getValue();
        LocalDate ultimoDiaDoMes = LocalDate.of(anoAtual, mes, 1).with(TemporalAdjusters.lastDayOfMonth());
        if (dataVencimento != null) {
            this.diasVencidos = (int) ChronoUnit.DAYS.between(ultimoDiaDoMes, dataVencimento);

            if (diasVencidos < 0) {
                this.diasVencidos = -this.diasVencidos;
            } else if (diasVencidos > 0) {
                this.diasVencidos = 0;
            }
        }
    }

    public void setDiasVencidos(int month) {
        if(month == 0) month = 1;
        calcularDiasVencidos(month);
    }

    public int getDiasVencidos(int month) {
        calcularDiasVencidos(month);
        return diasVencidos;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public void setStatus(StatusConciliacao status) {
        this.status = status;
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
        calcularDiasVencidos(LocalDate.now().getMonth().getValue());
    }
    public String getDataVencimento() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return dataVencimento.format(formatter);
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

    public String getStatus() {
        if (composicaoLancamentosContabeis != null) {
            return composicaoLancamentosContabeis.getStatus().name;
        } else {
            return StatusConciliacao.OPEN.name;
        }
    }




}
