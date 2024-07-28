package br.com.clearcont.clearcontwebapp.config.security

import br.com.clearcont.clearcontwebapp.models.ApplicationUser
import br.com.clearcont.clearcontwebapp.repositories.UserRepository
import com.vaadin.flow.server.VaadinServletRequest
import com.vaadin.flow.server.VaadinServletResponse
import com.vaadin.flow.spring.security.AuthenticationContext
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.util.*

@Component
class AuthenticatedUser(
    private val authenticationContext: AuthenticationContext,
    private val userRepository: UserRepository
) {
    private val authentication: Optional<Authentication>
        get() {
            val context = SecurityContextHolder.getContext()
            return Optional.ofNullable(context.authentication)
                .filter { authentication: Authentication? -> authentication !is AnonymousAuthenticationToken }
        }

    fun get(): Optional<ApplicationUser> {
        return authentication.map { authentication: Authentication -> userRepository.findByUsername(authentication.name) }
    }

    fun logout() {
        authenticationContext.logout()
        clearCookies()
    }


    private fun clearCookies() {
        clearCookie(JWT_HEADER_AND_PAYLOAD_COOKIE_NAME)
        clearCookie(JWT_SIGNATURE_COOKIE_NAME)
    }

    private fun clearCookie(cookieName: String) {
        val request = VaadinServletRequest.getCurrent().httpServletRequest
        val response = VaadinServletResponse.getCurrent().httpServletResponse
        val k = Cookie(cookieName, null).apply {
            path = getRequestContextPath(request)
            maxAge = 0
            secure = request.isSecure
            isHttpOnly = false
        }
        response.addCookie(k)
    }

    private fun getRequestContextPath(request: HttpServletRequest): String {
        val contextPath = request.contextPath
        return if ("" == contextPath) "/" else contextPath
    }

    companion object {
        private const val JWT_HEADER_AND_PAYLOAD_COOKIE_NAME = "jwt.headerAndPayload"
        private const val JWT_SIGNATURE_COOKIE_NAME = "jwt.signature"
    }
}
