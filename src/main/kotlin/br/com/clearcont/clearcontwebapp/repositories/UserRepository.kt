package br.com.clearcont.clearcontwebapp.repositories

import br.com.clearcont.clearcontwebapp.models.ApplicationUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<ApplicationUser, Long>, JpaSpecificationExecutor<ApplicationUser> {
    fun findByUsername(username: String): ApplicationUser?
}
