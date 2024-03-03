package com.clearcont.clearcontapp.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.clearcont.clearcontapp.model.Anexo;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.repository.AnexoRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AnexoStorageServiceImpl implements AnexoStorageService {

    private final AnexoRepository anexoRepository;

    private final AmazonS3 space;

    @Value("${do.spaces.bucket}")
    private String doSpaceBucket;

    @NotNull String FOLDER = "files/";

    public AnexoStorageServiceImpl(AnexoRepository anexoRepository, AmazonS3 space) {
        this.anexoRepository = anexoRepository;
        this.space = space;
    }

    @Override
    public void saveFile(@NotNull MultipartFile multipartFile, ComposicaoLancamentosContabeis lancamentosContabeis, String companyName) throws IOException {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        String fileName = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
        String key = FOLDER + companyName + fileName + "." + extension;
        saveAnexoToServer(multipartFile, key);
        Anexo anexo = new Anexo();
        anexo.setComposicaoLancamentosContabeis(lancamentosContabeis);
        anexo.setName(fileName);
        anexo.setExt(extension);
        anexo.setCreatedTime(new Timestamp(new Date().getTime()));
        anexoRepository.save(anexo);
    }

    public List<Anexo> getAnexosByComposicao(Long composicaoID) {
        return anexoRepository.findAnexoByComposicaoLancamentosContabeis_Id(composicaoID);
    }

    @Override
    public void deleteFile(@NotNull Long fileId, String companyName) {
        Optional<Anexo> imageOpt = anexoRepository.findById(fileId);
        if (imageOpt.isPresent()) {
            Anexo anexo = imageOpt.get();
            String key = FOLDER + companyName + anexo.getName() + "." + anexo.getExt();
            try {
                space.deleteObject(new DeleteObjectRequest(doSpaceBucket, key));
                anexoRepository.delete(anexo);
            } catch (AmazonServiceException e) {
                log.info("Caught an AmazonServiceException, which means your request made it "
                        + "to Amazon S3, but was rejected with an error response for some reason.");
                log.info("Error Message:    " + e.getMessage());
                log.info("HTTP Status Code: " + e.getStatusCode());
                log.info("AWS Error Code:   " + e.getErrorCode());
                log.info("Error Type:       " + e.getErrorType());
                log.info("Request ID:       " + e.getRequestId());
            } catch (SdkClientException e) {
                log.info("Caught an SdkClientException, which means the client encountered "
                        + "a serious internal problem while trying to communicate with S3, "
                        + "such as not being able to access the network.");
                log.info("Error Message: " + e.getMessage());
            }
        }
    }

    private void saveAnexoToServer(@NotNull MultipartFile multipartFile, String key) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getInputStream().available());
        if (multipartFile.getContentType() != null && !"".equals(multipartFile.getContentType())) {
            metadata.setContentType(multipartFile.getContentType());
        }
        space.putObject(new PutObjectRequest(doSpaceBucket, key, multipartFile.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    @Override
    public @NotNull List<Anexo> getAnexo() {
        return anexoRepository.findAll();
    }

    public @NotNull List<String> getAnexoFileNames() {

        ListObjectsV2Result result = space.listObjectsV2(doSpaceBucket);
        List<S3ObjectSummary> objects = result.getObjectSummaries();

        return objects.stream().map(S3ObjectSummary::getKey).collect(Collectors.toList());
    }

    //    Esta função retorna S3ObjectInputStream que é a representação do arquivo recuperado do DO space.
//    Você tem que usar esta função combinando-a com sua função getAnexosByBalanceteID.
//            Primeiro, recupere o anexo pelo ID Balancete.
//    Depois, para cada anexo, use a função getFile para recuperar o arquivo do DO space.
    public S3ObjectInputStream getFile(String fileName, String fileExt) {
        String key = FOLDER + fileName + "." + fileExt;
        S3Object object = space.getObject(new GetObjectRequest(doSpaceBucket, key));
        return object.getObjectContent();
    }


    public @NotNull InputStreamResource loadFileAsResource(String fileName, String fileExt) {
        try {
            String key = FOLDER + fileName + "." + fileExt;
            S3Object object = space.getObject(new GetObjectRequest(doSpaceBucket, key));
            S3ObjectInputStream objectContent = object.getObjectContent();
            return new InputStreamResource(objectContent);
        } catch (AmazonServiceException e) {
            throw new RuntimeException("Erro ao recuperar arquivo do S3", e);
        }
    }

}