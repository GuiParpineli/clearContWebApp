package com.clearcont.clearcontapp.model;

import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vaadin.flow.component.notification.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.proxy.HibernateProxy;
import org.jetbrains.annotations.Nullable;

import java.text.NumberFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Objects;

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Slf4j
public class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;
    private String historico;
    @NotNull
    private Double debito = 0.0;
    @NotNull
    private Double credito = 0.0;
    private Double saldoContabil = debito - credito;
    @Enumerated(EnumType.STRING)
    private StatusConciliacao status = StatusConciliacao.OPEN;

    @Setter
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "balancete_id")
    private Balancete balancete;

    @Setter
    @ManyToOne
    private Responsavel responsavel;

    @OneToOne(fetch = FetchType.LAZY)    @JoinColumn(name = "customer_contabil_id")
    private CustomerContabil customerContabil;

    public ComposicaoLancamentosContabeis(Balancete balancete, Responsavel responsavel) {
        this.data = LocalDate.now();
        this.historico = "";
        this.debito = 0.0;
        this.credito = 0.0;
        this.saldoContabil = 0.0;
        this.status = StatusConciliacao.PROGRESS;
        this.balancete = balancete;
        this.responsavel = responsavel;
    }

    public ComposicaoLancamentosContabeis(Responsavel responsavel) {
        this.responsavel = responsavel;
    }

    public int contarPontos(@org.jetbrains.annotations.NotNull String texto) {
        int contador = 0;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == '.') {
                contador++;
            }
        }
        return contador;
    }

    public @org.jetbrains.annotations.NotNull String getDataFormated() {
        var formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"));
        return this.data.format(formatador);
    }


    public void setDebito(@org.jetbrains.annotations.NotNull String debito) {
        NumberFormat format = NumberFormat.getInstance(Locale.of("pt", "BR"));
        try {
            this.debito = format.parse(debito.replace("R$", "").trim()).doubleValue();
            this.saldoContabil = this.debito - this.credito;
        } catch (ParseException e) {
            log.info(e.getMessage());
            Notification.show("Erro");
        }
    }

    public void setCredito(@org.jetbrains.annotations.NotNull String credito) {
        NumberFormat format = NumberFormat.getInstance(Locale.of("pt", "BR"));
        try {
            this.credito = format.parse(credito.replace("R$", "").trim()).doubleValue();
            this.saldoContabil = this.debito - this.credito;
        } catch (ParseException e) {
            log.info(e.getMessage());
            Notification.show("Erro");
        }
    }

    public @org.jetbrains.annotations.NotNull String getDebito() {
        return DecimalFormatBR.getDecimalFormat().format(debito);
    }

    public @org.jetbrains.annotations.NotNull String getCredito() {
        return DecimalFormatBR.getDecimalFormat().format(credito);
    }

    public @org.jetbrains.annotations.NotNull String getSaldoContabil() {
        return DecimalFormatBR.getDecimalFormat().format(saldoContabil);
    }

    public double getDoubleSaldoContabil() {
        return saldoContabil;
    }

}