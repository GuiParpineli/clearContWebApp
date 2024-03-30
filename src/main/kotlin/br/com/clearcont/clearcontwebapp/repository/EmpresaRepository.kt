package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.Empresa
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface EmpresaRepository : JpaRepository<Empresa, Long> {
    fun findEmpresaByNomeEmpresa(nome: String): Optional<Empresa>
}
