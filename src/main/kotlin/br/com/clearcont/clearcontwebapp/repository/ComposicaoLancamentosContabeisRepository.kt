package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.helpers.CNPJ
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ComposicaoLancamentosContabeisRepository : JpaRepository<ComposicaoLancamentosContabeis, UUID> {
    @Query("SELECT c FROM ComposicaoLancamentosContabeis c WHERE c.balancete.id = ?1")
    fun findByBalanceteId(id: Long?): List<ComposicaoLancamentosContabeis>

    fun findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(
        balancete_empresa_cnpj: @CNPJ String?,
        balancete_ano: Int?,
        balancete_mes: String?
    ): List<ComposicaoLancamentosContabeis>

    fun findComposicaoLancamentosContabeisByResponsavel_Id(responsavel_id: Long?): List<ComposicaoLancamentosContabeis>
}
