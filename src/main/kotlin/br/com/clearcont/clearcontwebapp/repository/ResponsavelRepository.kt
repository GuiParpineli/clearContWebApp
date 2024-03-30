package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.Responsavel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ResponsavelRepository : JpaRepository<Responsavel?, Long?> {
    fun findResponsavelByEmpresa_Id(id: Long?): List<Responsavel?>?
}
