package br.com.clearcont.clearcontwebapp.models

import lombok.Getter

@Getter
enum class StatusConciliacao(override val name: String) {
    OPEN("ABERTO"), PROGRESS("EM ANDAMENTO"), CLOSED("FINALIZADO")
}
