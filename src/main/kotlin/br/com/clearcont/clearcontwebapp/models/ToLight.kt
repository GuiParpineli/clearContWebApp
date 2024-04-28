package br.com.clearcont.clearcontwebapp.models

fun ComposicaoLancamentosContabeis.toDTO(): ComposicaoLancamentosContabeisDTO {
    return ComposicaoLancamentosContabeisDTO(
        this.id,
        this.data,
        this.historico?: "",
        this.getDoubleDebito(),
        this.getDoubleCredito(),
        this.saldoContabil,
        this.balancete,
        this.responsavel
    )
}

fun ComposicaoLancamentosContabeisDTO.toEntity(): ComposicaoLancamentosContabeis {
    return ComposicaoLancamentosContabeis(
        this.id,
        this.historico ?: "",
        this.getDebito(),
        this.getCredito(),
        this.balancete,
        this.responsavel!!,
        this.status
    )
}
