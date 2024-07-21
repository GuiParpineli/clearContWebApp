package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.TypeCount
import jakarta.persistence.*
import java.time.LocalDate

@Entity
class Controle(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val subGrupo: String? = null,
    val circulante: TypeCount? = null,
    @Column(length = 30)
    val nomeConta: String? = null,
    val doubleSaldoBalancete: Double = 0.0,
    val doubleSaldoAnalise: Double= 0.0,
    val doubleValorDiferenca: Double= 0.0,
    val statusGeralConciliacao: String? = null,
    val observacoes: String? = null,
    val composicaoPreenchida: Boolean? = null,
    val agingListadaPendencia: Boolean? = null,
    val dataCompetencia: LocalDate? = null,
    val nomeResponsavel: String? = null,
    @ManyToOne
    val empresa: Empresa? = null
) {

    fun getSaldoBalancete(): String {
        return formatCurrencyBR(doubleSaldoBalancete)
    }

    fun getSaldoAnalise(): String {
        return formatCurrencyBR(doubleSaldoAnalise)
    }

    fun getValorDiferenca(): String {
        return formatCurrencyBR(doubleValorDiferenca)
    }
}
