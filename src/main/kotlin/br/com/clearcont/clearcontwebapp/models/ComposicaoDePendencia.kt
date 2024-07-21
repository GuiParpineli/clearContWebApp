package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class ComposicaoDePendencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
    val data: LocalDateTime? = null
    val descricao: String? = null
    val valor: Double? = null
    @Column(length = 30)
    var areaResposavel: String? = null
        private set
    val observacoes: String? = null
    @Column(length = 30)
    var aging: String? = null
        private set
}
