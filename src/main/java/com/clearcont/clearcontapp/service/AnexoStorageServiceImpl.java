package com.clearcont.clearcontapp.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.clearcont.clearcontapp.model.Anexo;
import com.clearcont.clearcontapp.repository.AnexoRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class AnexoStorageServiceImpl implements AnexoStorageService {

    private final AnexoRepository imageRepo;

    private final AmazonS3 s3Client;

    @Value("${do.space.bucket}")
    private String doSpaceBucket;

    String FOLDER = "files/";

    public AnexoStorageServiceImpl(AnexoRepository imageRepo, AmazonS3 s3Client) {
        this.imageRepo = imageRepo;
        this.s3Client = s3Client;
    }

    @Override
    public void saveFile(MultipartFile multipartFile) throws IOException {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        String imgName = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
        String key = FOLDER + imgName + "." + extension;
        saveImageToServer(multipartFile, key);
        Anexo anexo = new Anexo();
        anexo.setName(imgName);
        anexo.setExt(extension);
        anexo.setCreatedtime(new Timestamp(new Date().getTime()));
        imageRepo.save(anexo);
    }

    @Override
    public void deleteFile(Long fileId) throws Exception {
        Optional<Anexo> imageOpt = imageRepo.findById(fileId);
        imageOpt.get();
        Anexo anexo = imageOpt.get();
        String key = FOLDER + anexo.getName() + "." + anexo.getExt();
        s3Client.deleteObject(new DeleteObjectRequest(doSpaceBucket, key));
        imageRepo.delete(anexo);
    }

    private void saveImageToServer(MultipartFile multipartFile, String key) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getInputStream().available());
        if (multipartFile.getContentType() != null && !"".equals(multipartFile.getContentType())) {
            metadata.setContentType(multipartFile.getContentType());
        }
        s3Client.putObject(new PutObjectRequest(doSpaceBucket, key, multipartFile.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    @Override
    public List<Anexo> getImage() {
        return imageRepo.findAll();
    }

}
