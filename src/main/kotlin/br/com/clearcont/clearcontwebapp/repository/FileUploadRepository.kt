package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.FileUpload
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface FileUploadRepository : JpaRepository<FileUpload, Long> {
    @Query("SELECT f FROM FileUpload f WHERE f.composicaoLancamentosContabeis.id = ?1")
    fun findanexobycomposicaolancamentoscontabeisId(composicaoID: UUID): List<FileUpload>
}
