package br.com.clearcont.clearcontwebapp.config

import org.springframework.aot.hint.annotation.RegisterReflectionForBinding
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.S3Configuration
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.net.URI

@Configuration
class DoConfig {

    @Value("\${do.spaces.key}")
    private lateinit var doSpaceKey: String

    @Value("\${do.spaces.secret}")
    private lateinit var doSpaceSecret: String

    @Value("\${do.spaces.endpoint}")
    private lateinit var doSpaceEndpoint: String

    @Value("\${do.spaces.region}")
    private lateinit var doSpaceRegion: String

    @Bean
    fun getS3(): S3Client {
        val creds = AwsBasicCredentials.create(doSpaceKey, doSpaceSecret)
        val endpointUri = URI.create(doSpaceEndpoint)
        return S3Client.builder()
            .region(Region.of(doSpaceRegion))
            .credentialsProvider(StaticCredentialsProvider.create(creds))
            .endpointOverride(endpointUri)
            .serviceConfiguration(S3Configuration.builder().pathStyleAccessEnabled(true).build())
            .build()
    }
}
