package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.validation.constraints.Email
import org.hibernate.validator.constraints.br.CNPJ

@Entity

class Empresa(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val nomeEmpresa: String? = null,
    @CNPJ
    val cnpj: String? = null,
    val email: @Email String? = null
)
