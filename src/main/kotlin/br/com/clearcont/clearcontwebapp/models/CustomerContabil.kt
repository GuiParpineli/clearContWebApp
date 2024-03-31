package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.*
import org.apache.commons.lang3.builder.ToStringExclude
import org.springframework.data.jpa.domain.AbstractPersistable_.id
import org.springframework.security.config.Elements.CSRF
import java.time.LocalDate
import java.time.Year
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalAdjusters

@Entity
class CustomerContabil() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id = 0L
    var numNotaFiscal = 0
    var dataVencimento: LocalDate? = LocalDate.now()
    var ISS = 0.0
    var INSS = 0.0
    var IRRF = 0.0
    var CSRF = 0.0
    var diasVencidos: Int = 0
        set(value) {
            field = if (value == 0) 1 else value
        }

    var status: StatusConciliacao? = null

    @ToStringExclude
    @OneToOne(mappedBy = "customerContabil", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.EAGER)
    lateinit var composicaoLancamentosContabeis: ComposicaoLancamentosContabeis

    var composicaoData: LocalDate?
        get() = composicaoLancamentosContabeis.data
        set(composicaoData) {
            composicaoLancamentosContabeis.data = composicaoData!!
        }

    var composicaoDebito: String
        get() = composicaoLancamentosContabeis.getDebito()
        set(composicaoDebito) {
            composicaoLancamentosContabeis.setDebito(composicaoDebito.toDouble())
        }

    var composicaoCredito: String
        get() = composicaoLancamentosContabeis.getCredito()
        set(composicaoCredito) = composicaoLancamentosContabeis.setCredito(composicaoCredito.toDouble())

    var composicaoHistorico: String?
        get() = composicaoLancamentosContabeis.historico
        set(composicaoHistorico) {
            if (composicaoHistorico != null) {
                composicaoLancamentosContabeis.historico = composicaoHistorico
            }
        }

    fun getStatus(): String? = composicaoLancamentosContabeis.status?.name

    init {
        calcularDiasVencidos(LocalDate.now().month.value)
    }

    private fun getFixedMonthValue(month: Int): Int = if (month in 1..12) month else 1

    fun getDataVencimento(): String {
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        return dataVencimento!!.format(formatter)
    }

    fun getDiasVencidos(month: Int): Int {
        calcularDiasVencidos(month)
        return diasVencidos
    }

    private fun calcularDiasVencidos(mes: Int) {
        val fixedMes = getFixedMonthValue(mes)
        val anoAtual = Year.now().value
        val ultimoDiaDoMes = LocalDate.of(anoAtual, fixedMes, 1).with(TemporalAdjusters.lastDayOfMonth())
        dataVencimento?.let {
            this.diasVencidos = ChronoUnit.DAYS.between(ultimoDiaDoMes, dataVencimento).toInt()

            if (diasVencidos < 0) {
                this.diasVencidos = -this.diasVencidos
            } else if (diasVencidos > 0) {
                this.diasVencidos = 0
            }
        }
    }

    constructor(
        id: Long,
        numNotaFiscal: Int,
        dataVencimento: LocalDate?,
        ISS: Double,
        INSS: Double,
        IRRF: Double,
        CSRF: Double
    ) : this() {
        this.id = id
        this.numNotaFiscal = numNotaFiscal
        this.dataVencimento = dataVencimento
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
    }

}
