package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.helpers.unformatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao

fun ComposicaoLancamentosContabeis.toDTO(): ComposicaoLancamentosContabeisDTO {
    return ComposicaoLancamentosContabeisDTO(
        this.id,
        this.data,
        this.historico ?: "",
        formatCurrencyBR(this.debito),
        formatCurrencyBR(this.credito),
        this.balancete,
        this.responsavel,
        this.status ?: StatusConciliacao.OPEN
    )
}

fun ComposicaoLancamentosContabeisDTO.toEntity(): ComposicaoLancamentosContabeis {
    return ComposicaoLancamentosContabeis(
        this.id,
        this.historico ?: "",
        unformatCurrencyBR(this.debito),
        unformatCurrencyBR(this.credito),
        this.balancete,
        this.responsavel!!,
        this.status
    )
}
