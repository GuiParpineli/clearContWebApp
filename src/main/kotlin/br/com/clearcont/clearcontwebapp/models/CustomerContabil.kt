package br.com.clearcont.clearcontwebapp.models

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.OneToOne
import lombok.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
class CustomerContabil(
    id: Long,
    numNotaFiscal: Int,
    dataVencimento: LocalDate?,
    ISS: Double,
    INSS: Double,
    IRRF: Double,
    CSRF: Double,
    composicaoLancamentosContabeis: ComposicaoLancamentosContabeis?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id = 0L
    private var numNotaFiscal = 0
    private var dataVencimento: LocalDate? = LocalDate.now()
    private var ISS = 0.0
    private var INSS = 0.0
    private var IRRF = 0.0
    private var CSRF = 0.0
    private var diasVencidos = 0
    private var status: StatusConciliacao? = null

    @ToString.Exclude
    @OneToOne(mappedBy = "customerContabil", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.EAGER)
    private var composicaoLancamentosContabeis: ComposicaoLancamentosContabeis?

    fun calcularDiasVencidos(mes: Int) {
        val anoAtual: Int = Year.now().getValue()
        val ultimoDiaDoMes = LocalDate.of(anoAtual, mes, 1).with(TemporalAdjusters.lastDayOfMonth())
        if (dataVencimento != null) {
            this.diasVencidos = ChronoUnit.DAYS.between(ultimoDiaDoMes, dataVencimento).toInt()

            if (diasVencidos < 0) {
                this.diasVencidos = -this.diasVencidos
            } else if (diasVencidos > 0) {
                this.diasVencidos = 0
            }
        }
    }

    fun setDiasVencidos(month: Int) {
        var month = month
        if (month == 0) month = 1
        calcularDiasVencidos(month)
    }

    fun getDiasVencidos(month: Int): Int {
        calcularDiasVencidos(month)
        return diasVencidos
    }

    fun setDataVencimento(dataVencimento: LocalDate?) {
        this.dataVencimento = dataVencimento
    }

    fun setStatus(status: StatusConciliacao?) {
        this.status = status
    }

    init {
        this.id = id
        this.numNotaFiscal = numNotaFiscal
        this.dataVencimento = dataVencimento
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
        this.composicaoLancamentosContabeis = composicaoLancamentosContabeis
        calcularDiasVencidos(LocalDate.now().month.value)
    }

    fun getDataVencimento(): String {
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        return dataVencimento!!.format(formatter)
    }

    var composicaoData: LocalDate?
        get() = if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis.getData()
        } else {
            LocalDate.now()
        }
        set(composicaoData) {
            if (composicaoLancamentosContabeis == null) {
                composicaoLancamentosContabeis = ComposicaoLancamentosContabeis()
            }
            composicaoLancamentosContabeis.setData(composicaoData)
        }

    var composicaoDebito: String
        get() = if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis!!.debito
        } else {
            "0"
        }
        set(composicaoDebito) {
            if (composicaoLancamentosContabeis == null) {
                composicaoLancamentosContabeis = ComposicaoLancamentosContabeis()
            }
            composicaoLancamentosContabeis!!.debito = composicaoDebito
        }

    var composicaoCredito: String
        get() = if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis!!.credito
        } else {
            "0"
        }
        set(composicaoCredito) {
            if (composicaoLancamentosContabeis == null) {
                composicaoLancamentosContabeis = ComposicaoLancamentosContabeis()
            }
            composicaoLancamentosContabeis!!.credito = composicaoCredito
        }

    var composicaoHistorico: String?
        get() = if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis.getHistorico()
        } else {
            "0"
        }
        set(composicaoHistorico) {
            if (composicaoLancamentosContabeis != null) {
                composicaoLancamentosContabeis.setHistorico(composicaoHistorico)
            } else {
                composicaoLancamentosContabeis = ComposicaoLancamentosContabeis()
                composicaoLancamentosContabeis.setHistorico(composicaoHistorico)
            }
        }

    fun getStatus(): String? {
        return if (composicaoLancamentosContabeis != null) {
            composicaoLancamentosContabeis.getStatus().name
        } else {
            StatusConciliacao.OPEN.name
        }
    }
}
