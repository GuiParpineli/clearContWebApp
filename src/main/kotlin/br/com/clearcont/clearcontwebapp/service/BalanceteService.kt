package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.TypeCount
import br.com.clearcont.clearcontwebapp.repository.BalanceteRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class BalanceteService(private val repository: BalanceteRepository) {
    val all: List<Balancete>
        get() = repository.findAll()

    fun getById(balanceteId: Long): Balancete {
        return repository.findById(balanceteId).get()
    }

    fun getByCompanyAndPeriod(id: Long, mes: String, ano: Int): List<Balancete> {
        return repository.findBalanceteByEmpresa_IdAndMesAndAno(id, mes, ano)
    }

    fun filterClassification(id: Long, mes: String, ano: Int, classification: TypeCount): List<Balancete> {
        return getByCompanyAndPeriod(id, mes, ano).stream()
            .filter { balancete: Balancete -> balancete.classificacao == classification }
            .toList()
    }

    fun delete(balancete: Balancete) {
        repository.delete(balancete)
    }

    fun update(balancete: Balancete): Balancete {
        return repository.saveAndFlush(balancete)
    }

    fun save(balancete: Balancete): Balancete {
        return repository.save(balancete)
    }

    @Transactional
    fun saveAll(id: Long, balancetes: List<Balancete?>) {
        repository.deleteAllByEmpresa_Id(id)
        repository.saveAll(balancetes)
    }
}
