package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.helpers.formatCurrencyBR
import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import com.fasterxml.jackson.annotation.JsonIgnore
import com.vaadin.flow.component.notification.Notification
import jakarta.persistence.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.logging.Logger

@Entity
class ComposicaoLancamentosContabeis {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null
    var data: LocalDate = LocalDate.now()
    var historico: String? = ""
    private var debito: Double = 0.0
    private var credito: Double = 0.0
    var saldoContabil: Double = 0.0


    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinColumn(name = "balancete_id")
    var balancete: Balancete? = null

    @Enumerated(EnumType.STRING)
    var status: StatusConciliacao? = null

    @PostLoad
    fun onLoad() {
        status = balancete?.status ?: StatusConciliacao.OPEN
        saldoContabil = debito - credito
    }

    @ManyToOne
    lateinit var responsavel: Responsavel

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_contabil_id")
    lateinit var customerContabil: CustomerContabil

    constructor(
        data: LocalDate,
        historico: String,
        debito: Double,
        credito: Double,
        doubleSaldoContabil: Double,
        balancete: Balancete?,
        responsavel: Responsavel,
        customerContabil: CustomerContabil
    ) : this() {
        this.data = data
        this.historico = historico
        this.debito = debito
        this.credito = credito
        this.saldoContabil = doubleSaldoContabil
        this.balancete = balancete
        this.responsavel = responsavel
        this.customerContabil = customerContabil
    }

    constructor()

    constructor(responsavel: Responsavel) {
        this.responsavel = responsavel
    }

    fun contarPontos(texto: String): Int {
        var contador = 0
        for (element in texto) {
            if (element == '.') {
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

    fun setDebito(value: Double) {
        this.debito = value
    }

    fun setDebito(debito: String) {
        val log = Logger.getLogger(javaClass.name)
        try {
            this.debito = debito.replace("R$", "").replace(".", "").replace(",", ".").trim().toDouble()
            this.saldoContabil = this.debito - credito
        } catch (e: NumberFormatException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun setCredito(credito: String) {
        val log = Logger.getLogger(javaClass.name)
        try {
            this.credito = credito.replace("R$", "").replace(".", "").replace(",", ".").trim().toDouble()
            this.saldoContabil = this.debito - this.credito
        } catch (e: NumberFormatException) {
            log.info(e.message)
            Notification.show("Erro")
        }
    }

    fun getDebito(): String {
        return formatCurrencyBR(debito)
    }

    fun getCredito(): String {
        return formatCurrencyBR(credito)
    }

    fun getSaldoContabil(): String {
        return formatCurrencyBR(saldoContabil)
    }

    fun setCredito(value: Double) {
        this.credito = value
    }
}
