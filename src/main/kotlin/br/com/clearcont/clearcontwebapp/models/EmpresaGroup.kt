package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*

@Entity
class EmpresaGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @OneToMany(fetch = FetchType.EAGER)
    var empresas: List<Empresa>? = null
)
