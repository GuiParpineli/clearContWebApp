package com.clearcont.clearcontapp.config.security;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoggerMiddleware implements HandlerInterceptor {
/*
    private final Logger logs;

    @Autowired
    public LoggerMiddleware(Logger logs) {
        this.logs = logs;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String requestUri = request.getRequestURI();

        if (!username.contains("anonymousUser") && !containsValue(requestUri))
            logs.get("Requisição pelo Swagger: ").info("Usuário: ", username);

        return true;
    }

    private boolean containsValue(String value) {
        String[] excludedUrls = {
             "/v3/api-docs",
             "/swagger-ui",
             "/resources"
        };

        for (String url : excludedUrls)
            if (value.contains(url)) return true;

        return false;
    }*/

}
