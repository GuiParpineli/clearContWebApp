package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import lombok.Getter
import java.time.LocalDateTime

@Entity
@Setter
@Getter
class ConciliacaoContabil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null
    private val status: String? = null
    private val data: LocalDateTime? = null
    private val classificacao: String? = null
}
