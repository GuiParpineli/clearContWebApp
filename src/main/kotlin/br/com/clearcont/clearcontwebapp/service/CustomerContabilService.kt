package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import br.com.clearcont.clearcontwebapp.repository.CustomerContabilRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
@Transactional
class CustomerContabilService(private val repository: CustomerContabilRepository) {
    @Transactional
    fun save(customer: CustomerContabil) {
        repository.save(customer)
    }

    fun findByBalanceteID(id: Long?): List<CustomerContabil> {
        return repository.findAllByComposicaoLancamentosContabeis_Balancete_Id(id)
    }

    fun update(customerContabil: CustomerContabil): CustomerContabil {
        return repository.saveAndFlush(customerContabil)
    }
}
