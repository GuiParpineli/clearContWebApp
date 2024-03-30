package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.FileUpload
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FileUploadRepository : JpaRepository<FileUpload?, Long?> {
    fun findAnexoByComposicaoLancamentosContabeis_Id(balanceteID: Long?): List<FileUpload?>?
}
