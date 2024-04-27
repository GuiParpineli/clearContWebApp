package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.Period
import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.models.enums.TypeCount
import jakarta.persistence.*
import java.time.LocalDate

@Entity
class Balancete(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne
    var empresa: Empresa? = null,
    var nomeConta: String = "",
    var numeroConta: Int = 0,
    private var totalBalancete: Double = 0.0,
    @Enumerated(EnumType.STRING)
    var classificacao: TypeCount = TypeCount.ATIVO,
    var mes: String = Period.getPortugueseMonthName(LocalDate.now().month),
    val ano: Int = LocalDate.now().year,
    @OneToMany(mappedBy = "balancete", cascade = [CascadeType.ALL], orphanRemoval = true)
    val lancamentosContabeisList: MutableList<ComposicaoLancamentosContabeis> = mutableListOf(),
    @Enumerated(EnumType.STRING)
    var status: StatusConciliacao = StatusConciliacao.OPEN,
    var tipo: TipoConta = TipoConta.INDEFINIDO
) {
    fun addComposicaoLancamentosContabeis(composicaoLancamentosContabeisLigth: ComposicaoLancamentosContabeis) {
        lancamentosContabeisList.add(composicaoLancamentosContabeisLigth)
        composicaoLancamentosContabeisLigth.balancete = this
    }

    fun removeComposicaoLancamentosContabeis(composicaoLancamentosContabeisLigth: ComposicaoLancamentosContabeis) {
        lancamentosContabeisList.remove(composicaoLancamentosContabeisLigth)
        composicaoLancamentosContabeisLigth.balancete = null
    }

    override fun toString(): String {
        return "Balancete{id=$id, empresa=$empresa, nomeConta='$nomeConta', numeroConta=$numeroConta, totalBalancete=$totalBalancete, classificacao='$classificacao', mes='$mes', ano=$ano}"
    }

    fun getTotalBalancete(): String {
        return formatCurrencyBR(totalBalancete)
    }

    fun getTotalBalanceteDouble(): Double {
        return totalBalancete
    }
}
