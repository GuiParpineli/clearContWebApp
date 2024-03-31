package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.FileUpload
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.repository.FileUploadRepository
import com.amazonaws.AmazonServiceException
import com.amazonaws.SdkClientException
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.*
import org.apache.commons.io.FilenameUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamResource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp
import java.util.*
import java.util.logging.Logger
import java.util.stream.Collectors

@Service
class FileUploadServiceImplement(private val fileUploadRepository: FileUploadRepository, private val space: AmazonS3) :
    FileUploadService {

    @Value("\${do.spaces.bucket}")
    private lateinit var doSpaceBucket: String

    val fileDirectory: String = "files/"

    override fun saveFile(
        multipartFile: MultipartFile?,
        lancamentosContabeis: ComposicaoLancamentosContabeis?,
        companyName: String?
    ) {
        val extension = FilenameUtils.getExtension(multipartFile?.originalFilename ?: "")
        val fileName = FilenameUtils.removeExtension(multipartFile?.originalFilename ?: "")
        val key = "$fileDirectory$companyName$fileName.$extension"
        if (multipartFile != null) {
            saveAnexoToServer(multipartFile, key)
        }
        val fileUpload = FileUpload()
        fileUpload.composicaoLancamentosContabeis = lancamentosContabeis
        fileUpload.name = fileName
        fileUpload.ext = extension
        fileUpload.createdTime = Timestamp(Date().time)
        fileUploadRepository.save(fileUpload)
    }

    fun getAnexosByComposicao(composicaoID: UUID): List<FileUpload> {
        return fileUploadRepository.findAnexoByComposicaoLancamentosContabeis_Id(composicaoID)
    }

    override fun deleteFile(fileId: Long?, companyName: String?) {
        val log = Logger.getLogger(javaClass.name)
        val imageOpt = fileId?.let { fileUploadRepository.findById(it) }
        if (imageOpt != null) {
            if (imageOpt.isPresent) {
                val anexo = imageOpt.get()
                val key = "${fileDirectory + companyName + anexo.name}.${anexo.ext}"
                try {
                    space.deleteObject(DeleteObjectRequest(doSpaceBucket, key))
                    fileUploadRepository.delete(anexo)
                } catch (e: AmazonServiceException) {
                    log.info(
                        "Caught an AmazonServiceException, which means your request made it "
                                + "to Amazon S3, but was rejected with an error response for some reason."
                    )
                    log.info("Error Message:    " + e.message)
                    log.info("HTTP Status Code: " + e.statusCode)
                    log.info("AWS Error Code:   " + e.errorCode)
                    log.info("Error Type:       " + e.errorType)
                    log.info("Request ID:       " + e.requestId)
                } catch (e: SdkClientException) {
                    log.info(
                        "Caught an SdkClientException, which means the client encountered "
                                + "a serious internal problem while trying to communicate with S3, "
                                + "such as not being able to access the network."
                    )
                    log.info("Error Message: " + e.message)
                }
            }
        }
    }

    private fun saveAnexoToServer(multipartFile: MultipartFile, key: String) {
        val metadata = ObjectMetadata()
        metadata.contentLength = multipartFile.inputStream.available().toLong()
        if (multipartFile.contentType != null && "" != multipartFile.contentType) {
            metadata.contentType = multipartFile.contentType
        }
        space.putObject(
            PutObjectRequest(doSpaceBucket, key, multipartFile.inputStream, metadata).withCannedAcl(
                CannedAccessControlList.PublicRead
            )
        )
    }

    override val fileUpload: List<FileUpload>
        get() = fileUploadRepository.findAll()

    val anexoFileNames: List<String>
        get() {
            val result = space.listObjectsV2(doSpaceBucket)
            val objects = result.objectSummaries

            return objects.stream().map { obj: S3ObjectSummary -> obj.key }.collect(Collectors.toList())
        }

    fun getFile(fileName: String, fileExt: String): S3ObjectInputStream {
        val key = "$fileDirectory$fileName.$fileExt"
        val `object` = space.getObject(GetObjectRequest(doSpaceBucket, key))
        return `object`.objectContent
    }

    fun loadFileAsResource(fileName: String, fileExt: String): InputStreamResource {
        try {
            val key = "$fileDirectory$fileName.$fileExt"
            val `object` = space.getObject(GetObjectRequest(doSpaceBucket, key))
            val objectContent = `object`.objectContent
            return InputStreamResource(objectContent)
        } catch (e: AmazonServiceException) {
            throw RuntimeException("Erro ao recuperar arquivo do S3", e)
        }
    }
}
