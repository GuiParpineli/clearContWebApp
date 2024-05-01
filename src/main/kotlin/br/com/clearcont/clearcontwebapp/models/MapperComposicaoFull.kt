package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.helpers.unformatCurrencyBR

fun ComposicaoLancamentosContabeis.toFullDTO(): ComposicaoLancamentosContabeisFullDTO {
    return ComposicaoLancamentosContabeisFullDTO(
        this.id,
        this.numNotaFiscal,
        this.dataVencimento,
        this.data,
        this.historico ?: "",
        formatCurrencyBR(this.debito),
        formatCurrencyBR(this.credito),
        formatCurrencyBR(this.ISS),
        formatCurrencyBR(this.IRRF),
        formatCurrencyBR(this.IRRF),
        formatCurrencyBR(this.CSRF),
        this.diasVencidos,
        this.balancete,
        this.responsavel,
        this.status!!
    )
}

fun ComposicaoLancamentosContabeisFullDTO.toEntity(): ComposicaoLancamentosContabeis {
    return ComposicaoLancamentosContabeis(
        this.id,
        this.numNotaFiscal,
        this.dataVencimento,
        this.data,
        unformatCurrencyBR(this.ISS),
        unformatCurrencyBR(this.INSS),
        unformatCurrencyBR(this.IRRF),
        unformatCurrencyBR(this.CSRF),
        this.diasVencidos,
        this.historico ?: "",
        unformatCurrencyBR(this.debito),
        unformatCurrencyBR(this.credito),
        this.balancete,
        this.status,
        this.responsavel!!
    )
}
