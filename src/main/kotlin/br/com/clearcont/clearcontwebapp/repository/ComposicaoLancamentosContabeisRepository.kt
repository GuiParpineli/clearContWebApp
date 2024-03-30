package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.helpers.CNPJ
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ComposicaoLancamentosContabeisRepository : JpaRepository<ComposicaoLancamentosContabeis?, Long?> {
    fun findComposicaoLancamentosContabeisByBalancete_Id(id: Long?): List<ComposicaoLancamentosContabeis?>?

    fun findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(
        balancete_empresa_cnpj: @CNPJ String?,
        balancete_ano: Int?,
        balancete_mes: String?
    ): List<ComposicaoLancamentosContabeis?>?

    fun findComposicaoLancamentosContabeisByResponsavel_Id(responsavel_id: Long?): List<ComposicaoLancamentosContabeis?>?
}
