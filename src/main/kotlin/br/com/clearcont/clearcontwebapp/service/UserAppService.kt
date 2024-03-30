package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.Role
import br.com.clearcont.clearcontwebapp.models.User
import br.com.clearcont.clearcontwebapp.repository.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class UserAppService(private val userRepository: UserRepository) : UserDetailsService {
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
        if (user == null) {
            throw UsernameNotFoundException("No user present with username: $username")
        } else {
            return org.springframework.security.core.userdetails.User(
                user.username, user.hashedPassword,
                getAuthorities(user)
            )
        }
    }

    fun getUserByUserName(username: String?): User {
        return userRepository.findByUsername(username)
    }

    companion object {
        private fun getAuthorities(user: User): List<GrantedAuthority> {
            return user.roles.stream().map { role: Role ->
                SimpleGrantedAuthority(
                    "ROLE_$role"
                )
            }
                .collect(Collectors.toList())
        }
    }
}
