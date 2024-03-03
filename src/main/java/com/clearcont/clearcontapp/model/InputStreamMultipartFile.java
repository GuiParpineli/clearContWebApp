package com.clearcont.clearcontapp.model;

import com.amazonaws.util.IOUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public record InputStreamMultipartFile(@NotNull InputStream inputStream, @NotNull String name) implements MultipartFile  {
    @Override
    public @NotNull String getName() {
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
    public byte @NotNull [] getBytes() throws IOException {
        return IOUtils.toByteArray(inputStream);
    }
    @Override
    public @NotNull InputStream getInputStream() {
        return inputStream;
    }
    @Override
    public void transferTo(@NotNull File dest) throws IOException, IllegalStateException {
        try (OutputStream os = new FileOutputStream(dest)) {
            IOUtils.copy(inputStream, os);
        }
    }
}