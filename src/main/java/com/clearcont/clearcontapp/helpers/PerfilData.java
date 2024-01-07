package com.clearcont.clearcontapp.helpers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CookieValue;

public class PerfilData {
    HttpServletResponse response;
    
    public void setCookieCompanyID(String value) {
        Cookie cookie = new Cookie("company-id", value);
        cookie.setMaxAge(60 * 60 * 24); // 24 horas
        response.addCookie(cookie);
    }
    
    public Integer companyId = 1;
}
