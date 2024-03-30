package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToOne
import jakarta.validation.constraints.Email
import lombok.AllArgsConstructor

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
class Responsavel(
    @field:GeneratedValue(strategy = GenerationType.IDENTITY) @field:Id private val id: Long,
    private val nome: String,
    private val email: @Email String?,
    @field:ManyToOne private val empresa: Empresa
) {
    @Setter
    @OneToOne(mappedBy = "responsavel", orphanRemoval = true)
    private val user: User? = null
}
