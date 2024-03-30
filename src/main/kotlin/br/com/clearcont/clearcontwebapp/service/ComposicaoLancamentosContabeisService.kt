package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import br.com.clearcont.clearcontwebapp.models.StatusConciliacao
import br.com.clearcont.clearcontwebapp.repository.ComposicaoLancamentosContabeisRepository
import br.com.clearcont.clearcontwebapp.repository.CustomerContabilRepository
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import org.vaadin.crudui.crud.impl.GridCrud

@Service
class ComposicaoLancamentosContabeisService(
    private val entityManager: EntityManager,
    private val contabeisRepository: ComposicaoLancamentosContabeisRepository,
    private val customerRepository: CustomerContabilRepository
) {
    val all: List<ComposicaoLancamentosContabeis>
        get() = contabeisRepository.findAll()

    fun getByID(id: Long): ComposicaoLancamentosContabeis {
        return contabeisRepository.findById(id).orElse(ComposicaoLancamentosContabeis())
    }

    fun save(entity: ComposicaoLancamentosContabeis) {
        contabeisRepository.save(entity)
    }

    fun deleteByID(id: Long) {
        contabeisRepository.deleteById(id)
    }

    fun getByBalanceteID(id: Long?): List<ComposicaoLancamentosContabeis> {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(id)
    }

    fun getByYearMonthAndCnpj(cnpj: String?, year: Int?, month: String?): List<ComposicaoLancamentosContabeis> {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(
            cnpj,
            year,
            month
        )
    }

    fun update(entity: ComposicaoLancamentosContabeis) {
        contabeisRepository.saveAndFlush(entity)
    }


    fun getSaldoContabil(balanceteId: Long?): Double {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(balanceteId)
            .stream().mapToDouble((ComposicaoLancamentosContabeis::doubleSaldoContabil)).sum()
    }

    fun atualizarSaldoContabil(balanceteId: Long?, crud: GridCrud<*>) {
        val saldoContabil = getSaldoContabil(balanceteId)
        crud.grid.getColumnByKey("saldoContabil")
            .setFooter("TOTAL SALDO: R$" + formatCurrencyBR(saldoContabil))
    }

    fun getTotalOpen(responsavelID: Long?): Int {
        val contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID)
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.OPEN) {
                total += 1
            }
        }
        return total
    }

    fun getTotalProgress(responsavelID: Long?): Int {
        val contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID)
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.PROGRESS) {
                total += 1
            }
        }
        return total
    }

    fun getTotalFinish(responsavelID: Long?): Int {
        val contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID)
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.CLOSED) {
                total += 1
            }
        }
        return total
    }


    @Transactional
    fun saveWithCustomer(entity: ComposicaoLancamentosContabeis, customer: CustomerContabil) {
        customerRepository.save(customer)
        entity.customerContabil = customer
        val mergedBalancete = entityManager.merge(entity.balancete)
        entity.balancete = mergedBalancete
        contabeisRepository.save(entity)
    }
}
