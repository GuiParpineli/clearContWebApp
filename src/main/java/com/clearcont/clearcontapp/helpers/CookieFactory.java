package com.clearcont.clearcontapp.helpers;

import com.vaadin.flow.server.VaadinResponse;
import com.vaadin.flow.server.VaadinService;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CookieFactory {
    VaadinResponse response;
    private final String CLASS_NAME = CookieFactory.class.getSimpleName();
    
    public void setCookie(String cookieName, String value) {
        Cookie cookie = new Cookie(cookieName, value);
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);
    }
    
    public Integer getCookieInteger(String cookieName) {
        int id = 0;
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                id = Integer.parseInt(cookie.getValue());
                Log.log(CLASS_NAME, "O valor do cookie é: " + cookie.getValue());
                break;
            }
        }
        return id;
    }
    
    public String getCookieString(String cookieName) {
        String cookieSaved = "";
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                cookieSaved = cookie.getValue();
                Log.log(CLASS_NAME, "O valor do cookie é: " + cookie.getValue());
                break;
            }
        }
        return cookieSaved;
    }
}
