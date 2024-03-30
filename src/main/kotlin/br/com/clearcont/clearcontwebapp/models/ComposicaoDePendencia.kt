package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDateTime

@Entity
class ComposicaoDePendencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
    val data: LocalDateTime? = null
    val descricao: String? = null
    val valor: Double? = null
    val areaResposavel: String? = null
    val observacoes: String? = null
    val aging: String? = null
}
