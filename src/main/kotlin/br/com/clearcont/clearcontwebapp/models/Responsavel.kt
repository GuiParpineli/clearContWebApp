package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull

@Entity
class Responsavel() {
    constructor(nome: String, email: String, empresa: Empresa) : this(){
        this.nome = nome
        this.email = email
        this.empresa = empresa
    }

    constructor(email: String, user: ApplicationUser, empresa: Empresa) : this(){
        this.email = email
        this.applicationUser = user
        this.empresa = empresa
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    var id: Long = 0

    @NotNull
    @Column(length = 50)
    lateinit var nome: String
    @NotNull
    @Email
    @Column(length = 50)
    lateinit var email: String

    @ManyToOne
    lateinit var empresa: Empresa

    @OneToOne(mappedBy = "responsavel", orphanRemoval = true)
    lateinit var applicationUser: ApplicationUser

}
