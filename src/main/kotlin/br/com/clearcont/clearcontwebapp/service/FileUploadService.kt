package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.FileUpload
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
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
