package com.clearcont.clearcontapp.model;

import com.clearcont.clearcontapp.helpers.DecimalFormatBR;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Entity
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Setter
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
    
}
