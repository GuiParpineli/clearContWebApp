package br.com.clearcont.clearcontwebapp.models

import com.clearcont.clearcontapp.helpers.DecimalFormatBR
import jakarta.persistence.*

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
class Balancete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null

    @ManyToOne
    @Setter
    private val empresa: Empresa? = null

    @Setter
    private val nomeConta: String? = null

    @Setter
    private val numeroConta: Int? = null
    var doubleTotalBalancete: Double? = null
        private set

    @Setter
    @Enumerated(EnumType.STRING)
    private val classificacao: TypeCount? = null

    @Setter
    private val mes: String? = null

    @Setter
    private val ano: Int? = null

    @OneToMany(mappedBy = "balancete", cascade = [CascadeType.ALL], orphanRemoval = true)
    private val composicaoLancamentosContabeisList: MutableList<ComposicaoLancamentosContabeis> = ArrayList()

    fun addComposicaoLancamentosContabeis(composicaoLancamentosContabeis: ComposicaoLancamentosContabeis) {
        composicaoLancamentosContabeisList.add(composicaoLancamentosContabeis)
        composicaoLancamentosContabeis.setBalancete(this)
    }

    fun removeComposicaoLancamentosContabeis(composicaoLancamentosContabeis: ComposicaoLancamentosContabeis) {
        composicaoLancamentosContabeisList.remove(composicaoLancamentosContabeis)
        composicaoLancamentosContabeis.setBalancete(null)
    }

    override fun toString(): String {
        return "Balancete{" + "id=" + id + ", empresa=" + empresa + ", nomeConta='" + nomeConta + '\'' + ", numeroConta=" + numeroConta + ", totalBalancete=" + doubleTotalBalancete + ", classificacao='" + classificacao + '\'' + ", mes='" + mes + '\'' + ", ano=" + ano + '}'
    }

    fun contarPontos(texto: String): Int {
        var contador = 0
        for (i in 0 until texto.length) {
            if (texto[i] == '.') {
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

    fun getTotalBalancete(): String {
        return DecimalFormatBR.getDecimalFormat().format(doubleTotalBalancete)
    }

    override fun equals(o: Any?): Boolean {
        if (this === o) return true
        if (o == null) return false
        val oEffectiveClass: Class<*> = if (o is HibernateProxy) (o as HibernateProxy).getHibernateLazyInitializer()
            .getPersistentClass() else o.javaClass
        val thisEffectiveClass: Class<*> =
            if (this is HibernateProxy) (this as HibernateProxy).getHibernateLazyInitializer()
                .getPersistentClass() else this.javaClass
        if (thisEffectiveClass != oEffectiveClass) return false
        val balancete = o as Balancete
        return getId() != null && getId() == balancete.getId()
    }

    override fun hashCode(): Int {
        return if (this is HibernateProxy) (this as HibernateProxy).getHibernateLazyInitializer().getPersistentClass()
            .hashCode() else javaClass.hashCode()
    }
}
