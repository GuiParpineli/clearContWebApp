package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.TypeCount
import br.com.clearcont.clearcontwebapp.repository.BalanceteRepository
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.util.logging.Logger

@Service
class BalanceteService(private val repository: BalanceteRepository, private val entityManager: EntityManager) {
    private val log = Logger.getLogger(javaClass.name)

    fun getAll(): List<Balancete> = repository.findAll()

    fun getById(balanceteId: Long): Balancete = repository.findById(balanceteId).get()

    fun getByCompanyAndPeriod(id: Long, mes: String, ano: Int): List<Balancete> =
        repository.findBalanceteByEmpresa_IdAndMesAndAno(id, mes, ano)

    fun filterClassification(id: Long, mes: String, ano: Int, classification: TypeCount): List<Balancete> {
        return getByCompanyAndPeriod(id, mes, ano).stream()
            .filter { balancete: Balancete -> balancete.classificacao == classification }
            .toList()
    }

    fun delete(balancete: Balancete) = repository.delete(balancete)

    fun update(balancete: Balancete): Balancete = repository.saveAndFlush(balancete)

    fun save(balancete: Balancete): Balancete {
        log.info("Salvando balancete : $balancete")
        return repository.save(balancete)
    }

    @Transactional
    fun saveAll(id: Long, balancetes: List<Balancete?>) {
        repository.deleteAllByEmpresa_Id(id)
        repository.saveAll(balancetes)
    }

    fun merge(balancete: Balancete): Balancete {
        return entityManager.merge(balancete)
    }
}
