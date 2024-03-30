package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import jakarta.persistence.*

@Entity
class Balancete(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne
    val empresa: Empresa? = null,
    val nomeConta: String? = null,
    val numeroConta: Int? = null,
    var doubleTotalBalancete: Double = 0.0,
    @Enumerated(EnumType.STRING)
    var classificacao: TypeCount = TypeCount.ATIVO,
    val mes: String = "JANEIRO",
    val ano: Int = 2020,
    @OneToMany(mappedBy = "balancete", cascade = [CascadeType.ALL], orphanRemoval = true)
    val composicaoLancamentosContabeisList: MutableList<ComposicaoLancamentosContabeis> = mutableListOf()

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

    fun setTotalBalancete(totalBalancete: String) {
        if (contarPontos(totalBalancete) < 1) this.doubleTotalBalancete = totalBalancete.replace(",", ".").toDouble()
        else this.doubleTotalBalancete =
            totalBalancete.replaceFirst("\\.".toRegex(), "").replaceFirst(",".toRegex(), ".").toDouble()
    }

    fun getTotalBalancete(): String? {
        return doubleTotalBalancete?.let { formatCurrencyBR(it) }
    }
}
