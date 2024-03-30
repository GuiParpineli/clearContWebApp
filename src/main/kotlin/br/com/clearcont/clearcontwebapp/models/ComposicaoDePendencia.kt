package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import lombok.Getter
import java.time.LocalDateTime

@Entity
@Setter
@Getter
class ComposicaoDePendencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null
    private val data: LocalDateTime? = null
    private val descricao: String? = null
    private val valor: Double? = null
    private val areaResposavel: String? = null
    private val observacoes: String? = null
    private val aging: String? = null
}
