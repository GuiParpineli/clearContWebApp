package br.com.clearcont.clearcontwebapp.models


enum class StatusConciliacao(val value: String) {
    OPEN("ABERTO"), PROGRESS("EM ANDAMENTO"), CLOSED("FINALIZADO")
}
