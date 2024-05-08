package br.com.clearcont.clearcontwebapp.repository

import br.com.clearcont.clearcontwebapp.models.Balancete
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface BalanceteRepository : JpaRepository<Balancete, Long> {
    fun findBalanceteByEmpresa_IdAndMesAndAno(id: Long, month: String, year: Int): List<Balancete>

    @Transactional
    fun deleteAllByEmpresa_Id(id: Long)

    @Transactional
    fun getBalanceteByEmpresa_Id(id: Long): List<Balancete>


    fun findByEmpresa_Id(id: Long): List<Balancete>
}
