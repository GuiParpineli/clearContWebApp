package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User?, Long?>, JpaSpecificationExecutor<User?> {
    fun findByUsername(username: String?): User?
}
