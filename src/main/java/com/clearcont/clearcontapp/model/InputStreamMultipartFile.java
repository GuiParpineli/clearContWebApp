package com.clearcont.clearcontapp.model;

import com.amazonaws.util.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class InputStreamMultipartFile implements MultipartFile {
    private final InputStream inputStream;
    private final String name;

    public InputStreamMultipartFile(InputStream inputStream, String name) {
        this.inputStream = inputStream;
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getOriginalFilename() {
        return name;
    }

    @Override
    public String getContentType() {
        return "application/octet-stream";
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public long getSize() {
        try {
            return inputStream.available();
        } catch (IOException e) {
            return 0L;
        }
    }

    @Override
    public byte[] getBytes() throws IOException {
        return IOUtils.toByteArray(inputStream);
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return inputStream;
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        try (OutputStream os = new FileOutputStream(dest)) {
            IOUtils.copy(inputStream, os);
        }
    }
}