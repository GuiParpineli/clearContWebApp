package br.com.clearcont.clearcontwebapp.services.impl

import br.com.clearcont.clearcontwebapp.models.ApplicationUser
import br.com.clearcont.clearcontwebapp.models.enums.Role
import br.com.clearcont.clearcontwebapp.repositories.UserRepository
import org.slf4j.LoggerFactory.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class UserAppService(private val userRepository: UserRepository) : UserDetailsService {
    private val log = getLogger(this.javaClass)

    override fun loadUserByUsername(username: String): UserDetails {
        log.info("Loading user by username: $username")
        val user = userRepository.findByUsername(username)
        if (user == null) {
            throw UsernameNotFoundException("No applicationUser present with username: $username")
        } else {
            return org.springframework.security.core.userdetails.User(
                user.username, user.password,
                getAuthorities(user)
            )
        }
    }

    fun getUserByUserName(username: String): ApplicationUser? {
        return userRepository.findByUsername(username)
    }

    fun getAll(): MutableList<ApplicationUser> {
        return userRepository.findAll()
    }

    fun delete(user: ApplicationUser) {
        userRepository.delete(user)
    }

    fun update(user: ApplicationUser): ApplicationUser {
        log.info("Updating user: $user")
        return userRepository.saveAndFlush(user)
    }

    fun save(user: ApplicationUser): ApplicationUser {
        log.info("Saving user: $user")
        return userRepository.save(user)
    }

    companion object {
        private fun getAuthorities(applicationUser: ApplicationUser): List<GrantedAuthority> {
            return applicationUser.roles.stream().map { role: Role -> SimpleGrantedAuthority("ROLE_$role") }
                .collect(Collectors.toList())
        }
    }
}
