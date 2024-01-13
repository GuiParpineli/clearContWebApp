package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    
    @OneToMany(mappedBy = "balancete", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComposicaoLancamentosContabeis> composicaoLancamentosContabeisList = new ArrayList<>();
    
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
