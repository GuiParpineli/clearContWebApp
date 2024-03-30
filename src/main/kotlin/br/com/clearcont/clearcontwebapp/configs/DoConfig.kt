package br.com.clearcont.clearcontwebapp.configs

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

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
    fun getS3(): AmazonS3 {
        val creds = BasicAWSCredentials(doSpaceKey, doSpaceSecret)
        return AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(AwsClientBuilder.EndpointConfiguration(doSpaceEndpoint, doSpaceRegion))
            .withCredentials(AWSStaticCredentialsProvider(creds)).build()
    }
}
