package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import jakarta.validation.constraints.Email

@Entity
class Responsavel() {
    constructor(id: Long?, nome: String, email: String, empresa: Empresa) : this(){
        this.id = id
        this.nome = nome
        this.email = email
        this.empresa = empresa
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    var id: Long? = null
    var nome: String = ""
    var email: @Email String = ""

    @ManyToOne
    lateinit var empresa: Empresa

    @OneToOne(mappedBy = "responsavel", orphanRemoval = true)
    lateinit var applicationUser: ApplicationUser

}
