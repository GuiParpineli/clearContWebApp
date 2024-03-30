package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.EmpresaGroup
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EmpresaGroupRepository : JpaRepository<EmpresaGroup, Long>
