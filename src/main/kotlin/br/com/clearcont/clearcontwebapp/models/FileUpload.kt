package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import java.sql.Timestamp

@Entity
class FileUpload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
    @Column(length = 50)
    var name: String? = null
    @Column(length = 10)
    var ext: String? = null
    var createdTime: Timestamp? = null

    @ManyToOne
    var composicaoLancamentosContabeis: ComposicaoLancamentosContabeis? = null
}
