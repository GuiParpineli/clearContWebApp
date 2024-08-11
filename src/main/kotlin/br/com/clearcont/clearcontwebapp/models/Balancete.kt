package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.utils.helpers.Period
import br.com.clearcont.clearcontwebapp.utils.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import br.com.clearcont.clearcontwebapp.models.enums.TypeCount
import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import java.time.LocalDate

@Entity
class Balancete(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne
    var empresa: Empresa? = null,
    @Column(length = 155) var nomeConta: String = "",
    var numeroConta: Int = 0,
    private var totalBalancete: Double = 0.0,
    @Enumerated(EnumType.STRING)
    var classificacao: TypeCount = TypeCount.ATIVO,
    @Column(length = 30)
    var mes: String = Period.getPortugueseMonthName(LocalDate.now().month),
    val ano: Int = LocalDate.now().year,
    @OneToMany(
        mappedBy = "balancete",
        cascade = [CascadeType.REMOVE, CascadeType.DETACH, CascadeType.REFRESH],
        fetch = FetchType.EAGER,
        orphanRemoval = true
    )
    val lancamentosContabeisList: MutableList<ComposicaoLancamentosContabeis> = mutableListOf(),
    @Enumerated(EnumType.ORDINAL)
    @Column(length = 2)
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
        return "Balancete{id=$id, empresa=$empresa, nomeConta='$nomeConta', numeroConta=$numeroConta, " +
                "totalBalancete=$totalBalancete, classificacao='$classificacao', mes='$mes', ano=$ano}"
    }

    fun getTotalBalancete(): String {
        return formatCurrencyBR(totalBalancete)
    }

    fun getTotalBalanceteDouble(): Double {
        return totalBalancete
    }
}
