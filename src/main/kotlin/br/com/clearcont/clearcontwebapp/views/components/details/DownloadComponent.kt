package br.com.clearcont.clearcontwebapp.views.components.details

import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeisDTO
import br.com.clearcont.clearcontwebapp.models.FileUpload
import br.com.clearcont.clearcontwebapp.models.InputStreamMultipartFile
import br.com.clearcont.clearcontwebapp.service.FileUploadServiceImplement
import com.vaadin.flow.component.Text
import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.html.Anchor
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H3
import com.vaadin.flow.component.icon.Icon
import com.vaadin.flow.component.icon.VaadinIcon
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.notification.NotificationVariant
import com.vaadin.flow.component.orderedlayout.HorizontalLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.component.upload.SucceededEvent
import com.vaadin.flow.component.upload.Upload
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer
import com.vaadin.flow.server.InputStreamFactory
import com.vaadin.flow.server.StreamResource
import elemental.json.Json
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.io.UncheckedIOException
import java.util.*
import java.util.function.Consumer


class DownloadComponent(
    private val anexoStorageService: FileUploadServiceImplement,
    private val lancamentosContabeis: ComposicaoLancamentosContabeis,
    private val companyName: String
) : HorizontalLayout() {
    private var downloadButtonsLayout = VerticalLayout()

    init {
        val singleFileUpload = upload

        this.downloadButtonsLayout = VerticalLayout()
        addDownloadButtons(lancamentosContabeis.id)
        add(
            this.downloadButtonsLayout,
            VerticalLayout(
                H3("Anexar novo documento:"),
                singleFileUpload
            )
        )
    }

    private val upload: Upload
        get() {
            val multiFileMemoryBuffer = MultiFileMemoryBuffer()
            val multiFileUpload = Upload(multiFileMemoryBuffer)

            //        multiFileUpload.setAcceptedFileTypes(".pdf", ".docx", ".png", ".jpeg", ".xls",);
            multiFileUpload.uploadButton = Button("Upload File")
            multiFileUpload.isDropAllowed = true
            val arrasteOsArquivosAqui = Div(Text("Arraste os arquivos aqui"))
            multiFileUpload.dropLabel = arrasteOsArquivosAqui

            multiFileUpload.addSucceededListener { event: SucceededEvent ->
                val inputStream = multiFileMemoryBuffer.getInputStream(event.fileName)
                val multipartFile: MultipartFile = InputStreamMultipartFile(inputStream, event.fileName)
                anexoStorageService.saveFile(multipartFile, lancamentosContabeis, companyName)
                Notification.show("Arquivo Anexado").apply {
                    addThemeVariants(NotificationVariant.LUMO_SUCCESS)
                    duration = 2000
                    position = Notification.Position.TOP_CENTER
                }
                addDownloadButtons(lancamentosContabeis.id)

                // Aqui para limpar o campo após o upload
                multiFileUpload.element.setPropertyJson("files", Json.createArray())
            }

            return multiFileUpload
        }

    private fun addDownloadButtons(composicaoId: UUID?) {
        downloadButtonsLayout.removeAll()

        val downloadButtons = updateFileList(composicaoId)
        downloadButtons.forEach(Consumer { components: HorizontalLayout? -> downloadButtonsLayout.add(components) })
    }

    private fun updateFileList(composicaoId: UUID?): List<HorizontalLayout> {
        val anexosByComposicao = composicaoId?.let {
            anexoStorageService.getAnexosByComposicao(it).apply {
                ifEmpty {
                    listOf(
                        FileUpload()
                    )
                }
            }
        }
        val anexos = anexosByComposicao
        val fileLayouts: MutableList<HorizontalLayout> = ArrayList()
        if (anexos != null) {
            for (anexo in anexos) {
                val downloadLink = Anchor()
                val resource = StreamResource(anexo.name, InputStreamFactory {
                    try {
                        return@InputStreamFactory anexoStorageService.loadFileAsResource(
                            anexo.name!!,
                            anexo.ext!!
                        ).inputStream
                    } catch (e: IOException) {
                        throw UncheckedIOException(e)
                    }
                })
                downloadLink.setHref(resource)
                downloadLink.element.setAttribute("download", true)
                val downloadButton = Button("Baixar " + anexo.name + "." + anexo.ext, Icon(VaadinIcon.DOWNLOAD_ALT))
                downloadLink.add(downloadButton)

                val removeButton = Button("Remover", Icon(VaadinIcon.TRASH))
                removeButton.addClickListener {
                    anexoStorageService.deleteFile(anexo.id, companyName)
                    Notification.show("Arquivo removido").apply {
                        addThemeVariants(NotificationVariant.LUMO_SUCCESS)
                        duration = 2000
                        position = Notification.Position.TOP_CENTER
                    }
                    addDownloadButtons(composicaoId)
                }

                val layout = HorizontalLayout(downloadLink, removeButton)
                fileLayouts.add(layout)
            }
        }
        return fileLayouts
    }
}
