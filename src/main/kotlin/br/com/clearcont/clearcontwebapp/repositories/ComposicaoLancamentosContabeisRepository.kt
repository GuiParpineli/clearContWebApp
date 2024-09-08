package br.com.clearcont.clearcontwebapp.repositories

import br.com.clearcont.clearcontwebapp.utils.helpers.CNPJ
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ComposicaoLancamentosContabeisRepository : JpaRepository<ComposicaoLancamentosContabeis, UUID> {

    @Query("SELECT c FROM ComposicaoLancamentosContabeis c WHERE c.balancete.id = ?1")
    fun findCompisitonByBalanceteId(id: Long?): List<ComposicaoLancamentosContabeis>

    @Query("select c from ComposicaoLancamentosContabeis c where c.balancete.empresa.id = ?1")
    fun findallbybalanceteEmpresaId(id: Long?): List<ComposicaoLancamentosContabeis>

    fun <T> findById(id: UUID, projection: Class<T>): Optional<T>

    @Query(
        """select c from ComposicaoLancamentosContabeis c
where c.balancete.empresa.cnpj = ?1 and c.balancete.ano = ?2 and c.balancete.mes = ?3"""
    )
    fun <T> findcomposicaolancamentoscontabeisbybalanceteEmpresaCnpjandbalanceteAnoandbalanceteMes(
        balanceteEmpresaCnpj: @CNPJ String?, balanceteAno: Int?, balanceteMes: String?, projection: Class<T>
    ): List<T>

    @Query("select c from ComposicaoLancamentosContabeis c where c.responsavel.id = ?1")
    fun <T> findcomposicaolancamentoscontabeisbyresponsavelId(responsavelId: Long?, projection: Class<T>): List<T>

    @Modifying
    @org.springframework.transaction.annotation.Transactional
    @Query("delete from ComposicaoLancamentosContabeis c where c.balancete.id = ?1")
    @Transactional
    fun deleteallbybalanceteId(id: Long)

    @Query("select c from ComposicaoLancamentosContabeis c where c.balancete.empresa.id = ?1")
    @Transactional
    fun findbybalanceteEmpresaId(id: Long): List<ComposicaoLancamentosContabeis>
}
