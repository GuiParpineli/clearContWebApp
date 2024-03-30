package br.com.clearcont.clearcontwebapp.models

import com.clearcont.clearcontapp.helpers.DecimalFormatBR
import com.fasterxml.jackson.annotation.JsonIgnore
import com.vaadin.flow.component.notification.Notification
import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import java.text.NumberFormat
import java.text.ParseException
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Slf4j
class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null
    private var data: LocalDate = LocalDate.now()
    private var historico: String? = null
    private var debito: @NotNull Double? = 0.0
    private var credito: @NotNull Double? = 0.0
    var doubleSaldoContabil: Double = debito!! - credito!!
        private set

    @Enumerated(EnumType.STRING)
    private var status = StatusConciliacao.OPEN

    @Setter
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinColumn(name = "balancete_id")
    private var balancete: Balancete? = null

    @Setter
    @ManyToOne
    private var responsavel: Responsavel

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_contabil_id")
    private val customerContabil: CustomerContabil? = null

    constructor(balancete: Balancete?, responsavel: Responsavel) {
        this.data = LocalDate.now()
        this.historico = ""
        this.debito = 0.0
        this.credito = 0.0
        this.doubleSaldoContabil = 0.0
        this.status = StatusConciliacao.PROGRESS
        this.balancete = balancete
        this.responsavel = responsavel
    }

    constructor(responsavel: Responsavel) {
        this.responsavel = responsavel
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

    val dataFormated: String
        get() {
            val formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy").withLocale(Locale.of("pt", "BR"))
            return data.format(formatador)
        }


    fun setDebito(debito: String) {
        val format = NumberFormat.getInstance(Locale.of("pt", "BR"))
        try {
            this.debito = format.parse(debito.replace("R$", "").trim { it <= ' ' }).toDouble()
            this.doubleSaldoContabil = this.debito!! - credito!!
        } catch (e: ParseException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun setCredito(credito: String) {
        val format = NumberFormat.getInstance(Locale.of("pt", "BR"))
        try {
            this.credito = format.parse(credito.replace("R$", "").trim { it <= ' ' }).toDouble()
            this.doubleSaldoContabil = debito!! - this.credito!!
        } catch (e: ParseException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun getDebito(): String {
        return DecimalFormatBR.getDecimalFormat().format(debito)
    }

    fun getCredito(): String {
        return DecimalFormatBR.getDecimalFormat().format(credito)
    }

    fun getSaldoContabil(): String {
        return DecimalFormatBR.getDecimalFormat().format(doubleSaldoContabil)
    }
}
