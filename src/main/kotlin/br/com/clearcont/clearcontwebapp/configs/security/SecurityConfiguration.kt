package br.com.clearcont.clearcontwebapp.configs.security

import br.com.clearcont.clearcontwebapp.views.routes.LoginView
import com.vaadin.flow.spring.security.VaadinWebSecurity
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer.AuthorizationManagerRequestMatcherRegistry
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Configuration
@EnableWebSecurity
class SecurityConfiguration : VaadinWebSecurity() {

    @Value("\${jwt.auth.secret}")
    private val authSecret: String? = null

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager = authenticationConfiguration.authenticationManager

    public override fun configure(httpSecurity: HttpSecurity) {
        httpSecurity
            .authorizeHttpRequests { auth ->
                auth.requestMatchers(AntPathRequestMatcher("/images/*.png")).permitAll()
                auth.requestMatchers(AntPathRequestMatcher("/line-awesome/**/*.svg")).permitAll()
            }
        super.configure(httpSecurity)
        setLoginView(httpSecurity, LoginView::class.java)
        setStatelessAuthentication(
            httpSecurity,
            SecretKeySpec(Base64.getDecoder().decode(authSecret), JwsAlgorithms.HS256),
            "com.clearcont.clearcontapp"
        )
    }
}
