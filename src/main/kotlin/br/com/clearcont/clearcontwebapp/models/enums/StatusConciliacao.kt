package br.com.clearcont.clearcontwebapp.models.enums


enum class StatusConciliacao(val value: String) {
    OPEN("ABERTO"), PROGRESS("EM ANDAMENTO"), PENDENT_REOPEN("PENDENTE REABERTURA"), CLOSED("FINALIZADO")
}
