package br.com.clearcont.clearcontwebapp.models

import com.clearcont.clearcontapp.helpers.CNPJ
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.validation.constraints.Email

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null
    private val nomeEmpresa: String? = null

    @CNPJ
    private val cnpj: String? = null
    private val email: @Email String? = null
}
