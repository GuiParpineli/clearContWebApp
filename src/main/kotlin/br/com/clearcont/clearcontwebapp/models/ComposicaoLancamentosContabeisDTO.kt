package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.PostLoad
import java.time.LocalDate
import java.util.*

class ComposicaoLancamentosContabeisDTO : ComposicaoLancamentos {
    var id: UUID? = null
    var historico: String? = ""
    private var debito: Double = 0.0
    private var credito: Double = 0.0
    var balancete: Balancete? = null
    @Enumerated(EnumType.STRING)
    var status: StatusConciliacao? = null
    lateinit var responsavel: Responsavel

    constructor(
        id: UUID?,
        data: LocalDate,
        historico: String,
        debito: Double,
        credito: Double,
        doubleSaldoContabil: Double,
        balancete: Balancete?,
        responsavel: Responsavel,
    ) : this() {
        this.id = id
        this.data = data
        this.historico = historico
        this.debito = debito
        this.credito = credito
        this.saldoContabil = doubleSaldoContabil
        this.balancete = balancete
        this.responsavel = responsavel
    }

    constructor()

    constructor(responsavel: Responsavel) {
        this.responsavel = responsavel
    }
}
