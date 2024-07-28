package br.com.clearcont.clearcontwebapp.services.impl

import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.FileUpload
import org.springframework.web.multipart.MultipartFile

interface FileUploadService {
    fun saveFile(
        multipartFile: MultipartFile?,
        lancamentosContabeis: ComposicaoLancamentosContabeis?,
        companyName: String?
    )

    fun deleteFile(fileId: Long?, companyName: String?)

    val fileUpload: List<FileUpload?>?
}
