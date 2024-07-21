package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import jakarta.validation.constraints.Email
import org.hibernate.validator.constraints.br.CNPJ

@Entity

class Empresa(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @Column(length = 50)
    var nomeEmpresa: String? = null,
    @CNPJ
    var cnpj: String? = null,
    var email: @Email String? = null
)
