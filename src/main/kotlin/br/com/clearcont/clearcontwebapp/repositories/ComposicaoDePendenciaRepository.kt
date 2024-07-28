package br.com.clearcont.clearcontwebapp.repositories

import br.com.clearcont.clearcontwebapp.models.ComposicaoDePendencia
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ComposicaoDePendenciaRepository : JpaRepository<ComposicaoDePendencia, Long>
