package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import br.com.clearcont.clearcontwebapp.models.Responsavel
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.repository.CustomerContabilRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
@Transactional
class CustomerContabilService(
    private val repository: CustomerContabilRepository,
    private val balanceteService: BalanceteService
) {
    @Transactional
    fun save(customerContabil: CustomerContabil, balanceteId: Long, responsavel: Responsavel, tipoConta: TipoConta) {
        customerContabil.composicaoLancamentosContabeis.balancete = balanceteService.getById(balanceteId)
        customerContabil.composicaoLancamentosContabeis.balancete!!.tipo =  tipoConta
        customerContabil.composicaoLancamentosContabeis.responsavel = responsavel
        repository.save(customerContabil)
    }

    fun findByBalanceteID(id: Long): List<CustomerContabil> {
        return repository.findCustomerContabilByBalanceteId(id)
    }

    fun update(customerContabil: CustomerContabil): CustomerContabil {
        return repository.saveAndFlush(customerContabil)
    }
}
