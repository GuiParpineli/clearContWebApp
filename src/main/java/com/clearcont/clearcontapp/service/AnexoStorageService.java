package com.clearcont.clearcontapp.service;

import java.io.IOException;
import java.util.List;

import com.clearcont.clearcontapp.model.Anexo;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import org.springframework.web.multipart.MultipartFile;

public interface AnexoStorageService {

    void saveFile(MultipartFile multipartFile, ComposicaoLancamentosContabeis lancamentosContabeis, String companyName) throws IOException;

    void deleteFile(Long fileId, String companyName);

    List<Anexo> getAnexo();
}