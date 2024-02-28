package com.clearcont.clearcontapp.service;

import java.io.IOException;
import java.util.List;

import com.clearcont.clearcontapp.model.Anexo;
import org.springframework.web.multipart.MultipartFile;

public interface AnexoStorageService {

	void saveFile(MultipartFile multipartFile) throws IOException;

	void deleteFile(Long id) throws Exception;
	
	List<Anexo> getImage();
}
