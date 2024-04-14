package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.CustomerContabil
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.repository.ComposicaoLancamentosContabeisRepository
import br.com.clearcont.clearcontwebapp.repository.CustomerContabilRepository
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import org.jboss.logging.Logger
import org.springframework.stereotype.Service
import org.vaadin.crudui.crud.impl.GridCrud
import java.util.*

@Service
class ComposicaoLancamentosContabeisService(
    private val entityManager: EntityManager,
    private val contabeisRepository: ComposicaoLancamentosContabeisRepository,
    private val customerRepository: CustomerContabilRepository
) {

    private val log = Logger.getLogger(javaClass.name)

    val all: List<ComposicaoLancamentosContabeis> = contabeisRepository.findAll()

    fun getByID(id: UUID): ComposicaoLancamentosContabeis {
        log.info("Obtendo composicao com id: $id")
        return contabeisRepository.findById(id).orElse(ComposicaoLancamentosContabeis())
    }
    @Transactional
    fun save(entity: ComposicaoLancamentosContabeis) {
        log.info("Saving composicao with id: ${entity.id}")
        val balancete = entity.balancete
        if (balancete != null) {
            val compositeExists = balancete.composicaoLancamentosContabeisList.contains(entity)
            if (!compositeExists) {
                balancete.addComposicaoLancamentosContabeis(entity)
            }
        }

        contabeisRepository.save(entity)
    }

    @Transactional
    fun deleteByID(id: UUID) {
        log.info("deleting composicao with id: $id")

        val composicao: ComposicaoLancamentosContabeis = contabeisRepository.findById(id).orElse(null)

        val balancete = composicao.balancete
        balancete?.removeComposicaoLancamentosContabeis(composicao)

        contabeisRepository.delete(composicao)
    }

    fun getByBalanceteID(id: Long?): List<ComposicaoLancamentosContabeis> {
        log.info("obtendo balancete da composicao, balancete id: $id")
        return contabeisRepository.findByBalanceteId(id)
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
        return contabeisRepository.findByBalanceteId(balanceteId)
            .stream().mapToDouble((ComposicaoLancamentosContabeis::saldoContabil)).sum()
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
