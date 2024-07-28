package br.com.clearcont.clearcontwebapp.repositories

import br.com.clearcont.clearcontwebapp.models.Controle
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ControleRepository : JpaRepository<Controle, Long>
