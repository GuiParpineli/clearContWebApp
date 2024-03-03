package com.clearcont.clearcontapp.config.security;

import com.clearcont.clearcontapp.views.routes.LoginView;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends VaadinWebSecurity {
    
    @Value("${jwt.auth.secret}")
    private String authSecret;
    
    @Bean
    public @NotNull PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(@NotNull AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Override
    public void configure(@NotNull HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(new AntPathRequestMatcher("/images/*.png")).permitAll();
                    auth.requestMatchers(new AntPathRequestMatcher("/line-awesome/**/*.svg")).permitAll();
                });
        super.configure(httpSecurity);
        setLoginView(httpSecurity, LoginView.class);
        setStatelessAuthentication(httpSecurity, new SecretKeySpec(Base64.getDecoder().decode(authSecret), JwsAlgorithms.HS256), "com.clearcont.clearcontapp");
    }

}