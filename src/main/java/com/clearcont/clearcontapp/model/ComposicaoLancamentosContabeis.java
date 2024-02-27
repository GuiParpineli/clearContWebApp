package com.clearcont.clearcontapp.model;

import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Objects;

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    private LocalDate data;
    @Setter
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "balancete_id")
    private Balancete balancete;

    @Setter
    @ManyToOne
    private Responsavel responsavel;

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

    public int contarPontos(String texto) {
        int contador = 0;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == '.') {
                contador++;
            }
        }
        return contador;
    }

    public String getDataFormated() {
        var formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"));
        return this.data.format(formatador);
    }

    public void setDebito(String debito) {
        if (contarPontos(debito) < 1) this.debito = Double.valueOf(debito.replace(",", "."));
        else this.debito = Double.valueOf(debito.replaceFirst("\\.", "").replaceFirst(",", "."));
        this.saldoContabil = this.debito - this.credito;
    }

    public void setCredito(String credito) {
        if (contarPontos(credito) < 1) this.credito = Double.valueOf(credito.replace(",", "."));
        else this.credito = Double.valueOf(credito.replaceFirst("\\.", "").replaceFirst(",", "."));
        this.saldoContabil = this.debito - this.credito;
    }

    public String getDebito() {
        return DecimalFormatBR.getDecimalFormat().format(debito);
    }

    public String getCredito() {
        return DecimalFormatBR.getDecimalFormat().format(credito);
    }

    public String getSaldoContabil() {
        return DecimalFormatBR.getDecimalFormat().format(saldoContabil);
    }

    public double getDoubleSaldoContabil() {
        return saldoContabil;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ComposicaoLancamentosContabeis that = (ComposicaoLancamentosContabeis) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
