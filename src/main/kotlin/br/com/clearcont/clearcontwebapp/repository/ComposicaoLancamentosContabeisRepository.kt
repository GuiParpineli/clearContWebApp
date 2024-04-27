package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.helpers.CNPJ
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import org.apache.poi.ss.formula.functions.T
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ComposicaoLancamentosContabeisRepository : JpaRepository<ComposicaoLancamentosContabeis, UUID> {
    @Query("SELECT c FROM ComposicaoLancamentosContabeis c WHERE c.balancete.id = ?1")
    fun  findByBalanceteId(id: Long?): List<ComposicaoLancamentosContabeis>

    fun <T> findById(id: UUID, projection: Class<T>): Optional<T>

    fun <T> findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(
        balancete_empresa_cnpj: @CNPJ String?,
        balancete_ano: Int?,
        balancete_mes: String?,
        projection: Class<T>
    ): List<T>

    fun <T> findComposicaoLancamentosContabeisByResponsavel_Id(responsavel_id: Long?, projection: Class<T>): List<T>
}
