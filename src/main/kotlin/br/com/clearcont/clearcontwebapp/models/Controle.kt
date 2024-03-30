package br.com.clearcont.clearcontwebapp.models

import com.clearcont.clearcontapp.helpers.DecimalFormatBR
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import java.time.LocalDate

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
class Controle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null
    private val subGrupo: String? = null
    private val circulante: TypeCount? = null
    private val nomeConta: String? = null
    val doubleSaldoBalancete: Double? = null
    val doubleSaldoAnalise: Double? = null
    val doubleValorDiferenca: Double? = null
    private val statusGeralConciliacao: String? = null
    private val observacoes: String? = null
    private val composicaoPreenchida: Boolean? = null
    private val agingListadaPendencia: Boolean? = null
    private val dataCompetencia: LocalDate? = null
    private val nomeResponsavel: String? = null

    @ManyToOne
    private val empresa: Empresa? = null

    fun getSaldoBalancete(): String {
        return DecimalFormatBR.getDecimalFormat().format(doubleSaldoBalancete)
    }

    fun getSaldoAnalise(): String {
        return DecimalFormatBR.getDecimalFormat().format(doubleSaldoAnalise)
    }

    fun getValorDiferenca(): String {
        return DecimalFormatBR.getDecimalFormat().format(doubleValorDiferenca)
    }
}
