package br.com.clearcont.clearcontwebapp.services.impl

import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.FileUpload
import br.com.clearcont.clearcontwebapp.repositories.FileUploadRepository
import org.apache.commons.io.FilenameUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamResource
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.exception.SdkClientException
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.*
import java.io.InputStream
import java.sql.Timestamp
import java.util.*
import java.util.logging.Logger
import java.util.stream.Collectors

@Service
class FileUploadServiceImplement(private val fileUploadRepository: FileUploadRepository, private val space: S3Client) :
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
        return fileUploadRepository.findanexobycomposicaolancamentoscontabeisId(composicaoID)
    }

    override fun deleteFile(fileId: Long?, companyName: String?) {
        val log = Logger.getLogger(javaClass.name)
        val imageOpt = fileId?.let { fileUploadRepository.findById(it) }
        if (imageOpt != null) {
            if (imageOpt.isPresent) {
                val anexo = imageOpt.get()
                val key = "${fileDirectory + companyName + anexo.name}.${anexo.ext}"
                try {
                    val deleteRequest = DeleteObjectRequest.builder().bucket(doSpaceBucket).key(key).build()
                    space.deleteObject(deleteRequest)
                    fileUploadRepository.delete(anexo)
                } catch (e: S3Exception) {
                    log.info(
                        "Caught an S3Exception, which means your request made it "
                                + "to Amazon S3, but was rejected with an error response for some reason."
                    )
                    log.info("Error Message:    " + e.message)
                    log.info("HTTP Status Code: " + e.statusCode())
                    log.info("Request ID:       " + e.requestId())
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
        val putObjectRequest = PutObjectRequest.builder()
            .bucket(doSpaceBucket)
            .key(key)
            .acl(ObjectCannedACL.PUBLIC_READ)
            .build()
        space.putObject(putObjectRequest, RequestBody.fromInputStream(multipartFile.inputStream, multipartFile.size))
    }

    override val fileUpload: List<FileUpload>
        get() = fileUploadRepository.findAll()

    val anexoFileNames: List<String>
        get() {
            val result = space.listObjectsV2 { it.bucket(doSpaceBucket) }
            val objects = result.contents()

            return objects.stream().map { obj: S3Object -> obj.key() }.collect(Collectors.toList())
        }

    fun getFile(fileName: String, fileExt: String): InputStream {
        val key = "$fileDirectory$fileName.$fileExt"
        val getObjectRequest = GetObjectRequest.builder().bucket(doSpaceBucket).key(key).build()
        return space.getObject(getObjectRequest)
    }

    fun loadFileAsResource(fileName: String, fileExt: String): InputStreamResource {
        try {
            val key = "$fileDirectory$fileName.$fileExt"
            val getObjectRequest = GetObjectRequest.builder().bucket(doSpaceBucket).key(key).build()
            val objectContent = space.getObject(getObjectRequest)
            return InputStreamResource(objectContent)
        } catch (e: S3Exception) {
            throw RuntimeException("Erro ao recuperar arquivo do S3", e)
        }
    }
}
