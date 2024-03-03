package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Responsavel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Email
    private String email;
    @ManyToOne
    private Empresa empresa;
    @Setter
    @OneToOne(mappedBy = "responsavel", orphanRemoval = true)
    private User user;

    public Responsavel(Long id, String nome, String email, Empresa empresa) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.empresa = empresa;
    }
}