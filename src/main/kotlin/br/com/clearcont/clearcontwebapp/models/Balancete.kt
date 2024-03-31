package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.Periodo
import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import jakarta.persistence.*
import org.springframework.data.jpa.domain.AbstractPersistable_.id
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
    private var doubleTotalBalancete: Double = 0.0,
    @Enumerated(EnumType.STRING)
    var classificacao: TypeCount = TypeCount.ATIVO,
    var mes: String = Periodo.getPortugueseMonthName(LocalDate.now().month),
    val ano: Int = LocalDate.now().year,
    @OneToMany(mappedBy = "balancete", cascade = [CascadeType.ALL], orphanRemoval = true)
    val composicaoLancamentosContabeisList: MutableList<ComposicaoLancamentosContabeis> = mutableListOf(),
    @Enumerated(EnumType.STRING)
    var status: StatusConciliacao = StatusConciliacao.OPEN
) {
    fun addComposicaoLancamentosContabeis(composicaoLancamentosContabeis: ComposicaoLancamentosContabeis) {
        composicaoLancamentosContabeisList.add(composicaoLancamentosContabeis)
        composicaoLancamentosContabeis.balancete = this
    }

    fun removeComposicaoLancamentosContabeis(composicaoLancamentosContabeis: ComposicaoLancamentosContabeis) {
        composicaoLancamentosContabeisList.remove(composicaoLancamentosContabeis)
        composicaoLancamentosContabeis.balancete = null
    }

    override fun toString(): String {
        return "Balancete{id=$id, empresa=$empresa, nomeConta='$nomeConta', numeroConta=$numeroConta, totalBalancete=$doubleTotalBalancete, classificacao='$classificacao', mes='$mes', ano=$ano}"
    }

    private fun contarPontos(texto: String): Int {
        var contador = 0
        for (element in texto) {
            if (element == '.') {
                contador++
            }
        }
        return contador
    }

//    fun setTotalBalancete(totalBalancete: String) {
//        if (contarPontos(totalBalancete) < 1) this.doubleTotalBalancete = totalBalancete.replace(",", ".").toDouble()
//        else this.doubleTotalBalancete =
//            totalBalancete.replaceFirst("\\.".toRegex(), "").replaceFirst(",".toRegex(), ".").toDouble()
//    }

    fun getTotalBalancete(): String {
        return formatCurrencyBR(doubleTotalBalancete)
    }

    fun getTotalBalanceteDouble(): Double {
        return doubleTotalBalancete
    }
}
