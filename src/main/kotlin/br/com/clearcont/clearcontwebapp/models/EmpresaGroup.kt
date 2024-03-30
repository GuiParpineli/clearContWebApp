package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import lombok.AllArgsConstructor

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
class EmpresaGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null

    @OneToMany(fetch = FetchType.EAGER)
    var empresas: List<Empresa>? = null
}
