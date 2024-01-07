package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Balancete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Empresa empresa;
    private String nomeConta;
    private Integer numeroConta;
    private Double totalBalancete;
    private String classificacao;
    private String mes;
    private Integer ano;
    
    @Override
    public String toString() {
        return "Balancete{" +
               "id=" + id +
               ", empresa=" + empresa +
               ", nomeConta='" + nomeConta + '\'' +
               ", numeroConta=" + numeroConta +
               ", totalBalancete=" + totalBalancete +
               ", classificacao='" + classificacao + '\'' +
               ", mes='" + mes + '\'' +
               ", ano=" + ano +
               '}';
    }
}
