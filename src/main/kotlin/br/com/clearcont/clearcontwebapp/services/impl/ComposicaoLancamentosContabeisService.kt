package br.com.clearcont.clearcontwebapp.services.impl

import br.com.clearcont.clearcontwebapp.utils.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeisDTO
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.toDTO
import br.com.clearcont.clearcontwebapp.repositories.BalanceteRepository
import br.com.clearcont.clearcontwebapp.repositories.ComposicaoLancamentosContabeisRepository
import br.com.clearcont.clearcontwebapp.repositories.ResponsavelRepository
import jakarta.transaction.Transactional
import org.jboss.logging.Logger
import org.springframework.stereotype.Service
import org.vaadin.crudui.crud.impl.GridCrud
import java.util.*

@Service
class ComposicaoLancamentosContabeisService(
    private val repository: ComposicaoLancamentosContabeisRepository,
    private val balanceteRepository: BalanceteRepository,
    private val responsavelRepository: ResponsavelRepository,
) {

    private val log = Logger.getLogger(javaClass.name)

    val all: List<ComposicaoLancamentosContabeis> = repository.findAll()

    val allLigth: List<ComposicaoLancamentosContabeisDTO> = repository.findAll().stream().map { it.toDTO() }.toList()

    fun <T> getByID(id: UUID, output: Class<T>): T = repository.findById(id, output).orElseThrow().also {
        log.info("Obtendo composicao com id: $id")
    }

    @Transactional
    fun save(entity: ComposicaoLancamentosContabeis): ComposicaoLancamentosContabeis {
        log.info("Saving composicao with id: ${entity.id}")
        val balancete = balanceteRepository.findById(entity.balancete?.id!!).orElseThrow()
        val responsavel = responsavelRepository.findById(entity.responsavel.id!!).orElseThrow()
        if (balancete != null) {
            val compositeExists = balancete.lancamentosContabeisList.contains(entity)
            if (!compositeExists) {
                balancete.addComposicaoLancamentosContabeis(entity)
            }
        }
        entity.responsavel = responsavel
        return repository.save(entity)
    }

    @Transactional
    fun deleteByID(id: UUID) {
        log.info("deleting composicao with id: $id")

        val composicao: ComposicaoLancamentosContabeis = repository.findById(id).orElse(null)

        val balancete = composicao.balancete
        balancete?.removeComposicaoLancamentosContabeis(composicao)

        repository.delete(composicao)
    }

    fun getByBalanceteID(id: Long?): List<ComposicaoLancamentosContabeis> {
        log.info("obtendo balancete da composicao, balancete id: $id")
        return repository.findByBalanceteId(id)
    }

    fun <T> getByYearMonthAndCnpj(cnpj: String?, year: Int?, month: String?, output: Class<T>): List<T> {
        return repository.findcomposicaolancamentoscontabeisbybalanceteEmpresaCnpjandbalanceteAnoandbalanceteMes(
            cnpj,
            year,
            month,
            output
        )
    }

    fun update(entity: ComposicaoLancamentosContabeis): ComposicaoLancamentosContabeis {
        return repository.saveAndFlush(entity)
    }

    fun getSaldoContabil(balanceteId: Long?): Double {
        return repository.findByBalanceteId(balanceteId).stream()
            .mapToDouble((ComposicaoLancamentosContabeis::saldoContabil)).sum()
    }

    fun atualizarSaldoContabil(balanceteId: Long?, crud: GridCrud<*>) {
        val saldoContabil = getSaldoContabil(balanceteId)
        crud.grid.getColumnByKey("saldoContabil")
            .setFooter("TOTAL SALDO: R$" + formatCurrencyBR(saldoContabil))
    }

    fun getTotalOpen(responsavelID: Long?): Int {
        val contabeisList = repository.findcomposicaolancamentoscontabeisbyresponsavelId(
            responsavelID,
            ComposicaoLancamentosContabeis::class.java
        )
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.OPEN) {
                total += 1
            }
        }
        return total
    }

    fun getTotalProgress(responsavelID: Long?): Int {
        val contabeisList = repository.findcomposicaolancamentoscontabeisbyresponsavelId(
            responsavelID,
            ComposicaoLancamentosContabeis::class.java
        )
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.PROGRESS) {
                total += 1
            }
        }
        return total
    }

    fun getTotalFinish(responsavelID: Long?): Int {
        val contabeisList = repository.findcomposicaolancamentoscontabeisbyresponsavelId(
            responsavelID,
            ComposicaoLancamentosContabeis::class.java
        )
        var total = 0
        for (contabeis in contabeisList) {
            if (contabeis.status == StatusConciliacao.CLOSED) {
                total += 1
            }
        }
        return total
    }

    fun findByBalanceteID(balanceteID: Long): List<ComposicaoLancamentosContabeis> {
        return repository.findByBalanceteId(balanceteID)
    }

    @Transactional
    fun createNewAndUpdate(balanceteId: Long?, responsavelID: Long?) {
        val balancete = balanceteRepository.findById(balanceteId!!).orElseThrow()
        val responsavel = responsavelRepository.findById(responsavelID!!).orElseThrow()
        repository.saveAndFlush(ComposicaoLancamentosContabeis(balancete, responsavel))
    }

    @Transactional
    fun saveAll(empresaID: Long, composicoesList: MutableList<ComposicaoLancamentosContabeis>) {
        log.info("BUSCANDO BALANCETE id: $empresaID para upload de grid")
        val composicoes = repository.findbybalanceteEmpresaId(empresaID)
        composicoesList.forEach { it.balancete = balanceteRepository.findById(it.balancete!!.id!!).orElseThrow() }
        log.info("SALVANDO COMPOSICOES: $composicoesList")
        repository.saveAll(composicoesList)
        composicoes.forEach { deleteByID(it.id!!) }
    }

    fun findAllStatusReopen(id: Long): List<ComposicaoLancamentosContabeis> {
        return repository.findbybalanceteEmpresaId(id).toList()
            .filter { it.status == StatusConciliacao.PENDENT_REOPEN }
    }
}
