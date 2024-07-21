package br.com.clearcont.clearcontwebapp.models

import com.amazonaws.util.IOUtils
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStream

class InputStreamMultipartFile() : MultipartFile {
    constructor(inputStream: InputStream, fileName: String) : this() {
    }

    override fun getName(): String {
        return name
    }

    override fun getOriginalFilename(): String {
        return name
    }

    override fun getContentType(): String {
        return "application/octet-stream"
    }

    override fun isEmpty(): Boolean {
        return false
    }

    override fun getSize(): Long {
        return try {
            inputStream.available().toLong()
        } catch (e: IOException) {
            0L
        }
    }

    @Throws(IOException::class)
    override fun getBytes(): ByteArray {
        return IOUtils.toByteArray(inputStream)
    }

    override fun getInputStream(): InputStream {
        return inputStream
    }

    @Throws(IOException::class, IllegalStateException::class)
    override fun transferTo(dest: File) {
        FileOutputStream(dest).use { os ->
            IOUtils.copy(inputStream, os)
        }
    }
}
