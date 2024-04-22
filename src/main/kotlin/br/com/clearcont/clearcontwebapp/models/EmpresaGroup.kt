package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*

@Entity
class EmpresaGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @OneToMany(fetch = FetchType.EAGER)
    var empresas: MutableList<Empresa> = mutableListOf()
) {
    fun addEmpresa(empresa: Empresa) {
        empresas.add(empresa)
    }

    fun removeEmpresa(empresa: Empresa) {
        empresas.remove(empresa)
    }
}
