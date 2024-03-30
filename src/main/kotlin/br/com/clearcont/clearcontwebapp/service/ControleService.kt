package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.Balancete
import br.com.clearcont.clearcontwebapp.models.ComposicaoLancamentosContabeis
import br.com.clearcont.clearcontwebapp.models.Controle
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.function.Consumer

@Service
@Transactional
class ControleService(private val balanceteService: BalanceteService) {
    fun getAllByMonthAndCompanyID(id: Long?, month: String?, year: Int?): List<Controle> {
        val byCompanyAndPeriod = balanceteService.getByCompanyAndPeriod(id, month, year)
        val controles: MutableList<Controle> = ArrayList()
        byCompanyAndPeriod.forEach(
            Consumer { balancete: Balancete ->
                if (!balancete.composicaoLancamentosContabeisList.isEmpty()) controles.add(
                    Controle(
                        null,
                        null,
                        balancete.classificacao,
                        balancete.nomeConta,
                        balancete.doubleTotalBalancete,
                        balancete.composicaoLancamentosContabeisList.stream().mapToDouble(
                            ComposicaoLancamentosContabeis::doubleSaldoContabil
                        ).sum(),
                        balancete.composicaoLancamentosContabeisList
                            .stream().mapToDouble(ComposicaoLancamentosContabeis::doubleSaldoContabil)
                            .sum() - balancete.doubleTotalBalancete!!,
                        "ABERTO",
                        "",
                        false,
                        false,
                        LocalDate.now(),
                        balancete.composicaoLancamentosContabeisList.first.responsavel.nome,
                        balancete.empresa
                    )
                )
            }
        )
        return controles
    }
}
