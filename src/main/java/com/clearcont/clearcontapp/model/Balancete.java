package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import lombok.*;

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
    @OneToOne
    private Cliente cliente;
    private String nomeConta;
    private int numeroConta;
    private Double totalBalancete;
    private String classificacao;
}
