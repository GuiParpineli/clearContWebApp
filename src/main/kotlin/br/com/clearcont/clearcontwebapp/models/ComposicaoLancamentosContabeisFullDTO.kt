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

data class ComposicaoLancamentosContabeisFullDTO(
    var id: UUID? = null,
    var numNotaFiscal: Int = 0,
    var historico: String? = "",
    var balancete: Balancete? = null,
    var debito: String = formatCurrencyBR(0.0),
    var credito: String = formatCurrencyBR(0.0),
    var ISS: String = formatCurrencyBR(0.0),
    var INSS: String = formatCurrencyBR(0.0),
    var IRRF: String = formatCurrencyBR(0.0),
    var CSRF: String = formatCurrencyBR(0.0),
    var responsavel: Responsavel? = null,
    var status: StatusConciliacao = StatusConciliacao.OPEN

) : ComposicaoLancamentos() {

    constructor(
        id: UUID?,
        numNotaFiscal: Int,
        dataVencimento: LocalDate?,
        data: LocalDate,
        historico: String,
        debito: String,
        credito: String,
        ISS: String,
        INSS: String,
        IRRF: String,
        CSRF: String,
        diasVencidos: Int,
        balancete: Balancete?,
        responsavel: Responsavel,
        status: StatusConciliacao
    ) : this() {
        this.id = id
        this.numNotaFiscal = numNotaFiscal
        super.dataVencimento = dataVencimento
        this.data = data
        this.historico = historico
        this.debito = debito
        this.credito = credito
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
        super.diasVencidos = diasVencidos
        this.balancete = balancete
        this.responsavel = responsavel
        this.status = status
    }

    constructor(balancete: Balancete?, responsavel: Responsavel) : this() {
        this.balancete = balancete
        this.responsavel = responsavel
    }
}
