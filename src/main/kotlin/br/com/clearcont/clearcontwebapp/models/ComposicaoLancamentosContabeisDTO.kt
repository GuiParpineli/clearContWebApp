package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.utils.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.utils.helpers.unformatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.PostLoad
import org.springframework.data.jpa.domain.AbstractPersistable_.id
import java.time.LocalDate
import java.util.*

data class ComposicaoLancamentosContabeisDTO(
    var id: UUID? = null,
    var historico: String? = "",
    var balancete: Balancete? = null,
    var debito: String = formatCurrencyBR(0.0),
    var credito: String = formatCurrencyBR(0.0),
    var responsavel: Responsavel? = null,
    var status: StatusConciliacao = StatusConciliacao.OPEN
) : ComposicaoLancamentos() {
    constructor(
        id: UUID?,
        data: LocalDate,
        historico: String,
        debito: String,
        credito: String,
        balancete: Balancete?,
        responsavel: Responsavel,
        status: StatusConciliacao
    ) : this() {
        this.id = id
        this.data = data
        this.historico = historico
        this.debito = debito
        this.credito = credito
        super.saldoContabil = unformatCurrencyBR(debito) - unformatCurrencyBR(credito)
        this.balancete = balancete
        this.responsavel = responsavel
        this.status = status
    }

    constructor(balancete: Balancete?, responsavel: Responsavel) : this() {
        this.balancete = balancete
        this.responsavel = responsavel
    }
}
