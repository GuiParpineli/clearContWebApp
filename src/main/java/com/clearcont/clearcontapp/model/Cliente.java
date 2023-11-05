package com.clearcont.clearcontapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import org.hibernate.validator.constraints.br.CNPJ;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomeEmpresa;
    @CNPJ
    private String cnpj;
    @Email
    private String email;
}
