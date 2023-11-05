package com.clearcont.clearcontapp.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
//@EnableWebSecurity
public class SecurityConfiguration implements WebMvcConfigurer {

/*    private final LoggerMiddleware loggerMiddleware;

    private final CriarAuthenticationProvider authenticationProvider;

    private static final String[] AUTH_LIST = {
            "/",
            "/v3/api-docs",
            "/configuration/ui",
            "/swagger-resources",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/swagger-ui/index.html"
    };

    @Autowired
    public SecurityConfiguration(LoggerMiddleware loggerMiddleware, CriarAuthenticationProvider authenticationProvider) {
        this.loggerMiddleware = loggerMiddleware;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(this.authenticationProvider);

        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(AUTH_LIST).authenticated()
                        .requestMatchers("/resources/**").permitAll()
                        .requestMatchers("/**").permitAll()
                ).formLogin(form -> form
                        .loginPage(LOGIN_PATH)
                        .loginProcessingUrl(AUTHENTICATION_PATH)
                        .defaultSuccessUrl("/", true)
                        .permitAll()
                ).logout(LogoutConfigurer::permitAll);

        return httpSecurity.build();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedMethods(List.of("*"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggerMiddleware);
    }*/

}
