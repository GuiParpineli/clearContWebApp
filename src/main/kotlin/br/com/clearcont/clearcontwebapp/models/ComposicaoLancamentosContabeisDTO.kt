package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.PostLoad
import java.time.LocalDate
import java.util.*

data class ComposicaoLancamentosContabeisDTO(
    var id: UUID? = null,
    var historico: String? = "",
    var balancete: Balancete? = null,
     var debito: Double = 0.0,
     var credito: Double = 0.0,
    var responsavel: Responsavel? = null,
    var status: StatusConciliacao = StatusConciliacao.OPEN
) : ComposicaoLancamentos() {
    constructor(
        id: UUID?,
        data: LocalDate,
        historico: String,
        debito: Double,
        credito: Double,
        balancete: Balancete?,
        responsavel: Responsavel,
        status: StatusConciliacao
    ) : this() {
        this.id = id
        this.data = data
        this.historico = historico
        this.debito = debito
        this.credito = credito
        super.saldoContabil = debito - credito
        this.balancete = balancete
        this.responsavel = responsavel
        this.status = status
    }

    constructor(balancete: Balancete?,responsavel: Responsavel) : this() {
        this.balancete = balancete
        this.responsavel = responsavel
    }
}
