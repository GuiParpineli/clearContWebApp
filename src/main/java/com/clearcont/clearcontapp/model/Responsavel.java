package com.clearcont.clearcontapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Responsavel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    @Email
    private String email;
    @ManyToOne
    private Empresa empresa;
    @OneToOne(mappedBy = "responsavel", orphanRemoval = true)
    private User user;
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Responsavel(Integer id, String nome, String email, Empresa empresa) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.empresa = empresa;
    }
}
