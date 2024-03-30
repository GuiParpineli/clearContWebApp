package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CustomerContabilRepository : JpaRepository<CustomerContabil, Long> {
    @Transactional
    @Query("SELECT c FROM CustomerContabil c WHERE c.composicaoLancamentosContabeis.balancete.id = ?1")
    fun findCustomerContabilByBalanceteId(id: Long): List<CustomerContabil>
}
