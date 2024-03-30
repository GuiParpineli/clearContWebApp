package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerContabilRepository : JpaRepository<CustomerContabil?, Long?> {
    @Transactional
    fun findAllByComposicaoLancamentosContabeis_Balancete_Id(id: Long?): List<CustomerContabil?>?
}
