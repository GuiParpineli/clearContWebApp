package br.com.clearcont.clearcontwebapp.helpers

import com.vaadin.flow.server.VaadinResponse
import com.vaadin.flow.server.VaadinService
import jakarta.servlet.http.Cookie
import java.util.logging.Logger

class CookieFactory(
    private var response: VaadinResponse
) {
    private val log: Logger = Logger.getLogger(javaClass.name)

    fun setCookie(cookieName: String?, value: String?) {
        val cookie = Cookie(cookieName, value)
        cookie.maxAge = 60 * 60 * 24
        response.addCookie(cookie)
    }

    fun getCookieInteger(cookieName: String): Long {
        var id = 0L
        val cookies = VaadinService.getCurrentRequest().cookies
        for (cookie in cookies) {
            if (cookie.name == cookieName) {
                id = cookie.value.toLong()
                log.info("O valor do cookie é:  ${cookie.value}")
                break
            }
        }
        return id
    }

    fun getCookieString(cookieName: String): String {
        var cookieSaved = ""
        val cookies = VaadinService.getCurrentRequest().cookies
        for (cookie in cookies) {
            if (cookie.name == cookieName) {
                cookieSaved = cookie.value
                log.info("O valor do cookie é:  ${cookie.value}")
                break
            }
        }
        return cookieSaved
    }
}
