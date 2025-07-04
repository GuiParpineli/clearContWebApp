package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.models.enums.StatusConciliacao
import br.com.clearcont.clearcontwebapp.models.enums.TipoConta
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.time.LocalDate
import java.time.Year
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalAdjusters
import java.util.*
import kotlin.jvm.Transient

@Entity
class ComposicaoLancamentosContabeis() : ComposicaoLancamentos() {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null
    var numNotaFiscal = 0
    override var dataVencimento: LocalDate? = LocalDate.now()
    var ISS = 0.0
    var INSS = 0.0
    var IRRF = 0.0
    var CSRF = 0.0
    var debito: Double = 0.0
    var credito: Double = 0.0
    override var diasVencidos: Int = 0
        set(value) {
            field = if (value == 0) 1 else value
        }
    var historico: String? = ""

    @JsonIgnore
    @ManyToOne(
        fetch = FetchType.EAGER,
        cascade = [CascadeType.DETACH, CascadeType.REMOVE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE]
    )
    @JoinColumn(name = "balancete_id")
    var balancete: Balancete? = null

    @Enumerated(EnumType.STRING)
    @Transient
    var status: StatusConciliacao? = null

    @ManyToOne
    lateinit var responsavel: Responsavel

    @PostLoad
    fun onLoad() {
        status = balancete?.status ?: StatusConciliacao.OPEN
        saldoContabil = debito - credito
    }

    init {
        calcularDiasVencidos(LocalDate.now().month.value)
    }

    private fun getFixedMonthValue(month: Int): Int = if (month in 1..12) month else 1

    override fun getDataVencimento(): String {
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        return dataVencimento!!.format(formatter)
    }

    override fun getDiasVencidos(month: Int): Int {
        calcularDiasVencidos(month)
        return diasVencidos
    }

    override fun calcularDiasVencidos(mes: Int) {
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

    override fun toString(): String {
        return "ComposicaoLancamentosContabeis(id=$id, numNotaFiscal=$numNotaFiscal, dataVencimento=$dataVencimento, ISS=$ISS, INSS=$INSS, IRRF=$IRRF, CSRF=$CSRF, debito=$debito, credito=$credito, diasVencidos=$diasVencidos, historico=$historico, balancete=$balancete, status=$status, responsavel=$responsavel)"
    }

    constructor(
        numNotaFiscal: Int,
        dataVencimento: LocalDate?,
        ISS: Double,
        INSS: Double,
        IRRF: Double,
        CSRF: Double
    ) : this() {
        this.numNotaFiscal = numNotaFiscal
        this.dataVencimento = dataVencimento
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
    }


    constructor(responsavel: Responsavel) : this() {
        this.responsavel = responsavel
    }

    constructor(
        id: UUID?,
        historico: String,
        debito: Double,
        credito: Double,
        balancete: Balancete?,
        responsavel: Responsavel,
        status: StatusConciliacao?
    ) : this() {
        this.id = id
        this.historico = historico
        this.debito = debito
        this.credito = credito
        this.balancete = balancete
        this.responsavel = responsavel
        this.status = status
    }

    constructor(
        numNotaFiscal: Int,
        dataVencimento: LocalDate?,
        data: LocalDate?,
        ISS: Double,
        INSS: Double,
        IRRF: Double,
        CSRF: Double,
        historico: String,
        credito: Double,
        debito: Double,
        balancete: Balancete?,
        status: StatusConciliacao?,
        responsavel: Responsavel
    ) : this() {
        super.data = data ?: LocalDate.now()
        this.numNotaFiscal = numNotaFiscal
        this.dataVencimento = dataVencimento
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
        this.historico = historico
        this.credito = credito
        this.debito = debito
        this.status = status
        this.balancete = balancete
        this.responsavel = responsavel
    }

    constructor(
        id: UUID?,
        numNotaFiscal: Int,
        dataVencimento: LocalDate?,
        data: LocalDate?,
        ISS: Double,
        INSS: Double,
        IRRF: Double,
        CSRF: Double,
        diasVencidos: Int,
        historico: String,
        debito: Double,
        credito: Double,
        balancete: Balancete?,
        status: StatusConciliacao?,
        responsavel: Responsavel
    ) : this() {
        this.id = id
        this.numNotaFiscal = numNotaFiscal
        this.dataVencimento = dataVencimento
        super.data = data ?: LocalDate.now()
        this.ISS = ISS
        this.INSS = INSS
        this.IRRF = IRRF
        this.CSRF = CSRF
        this.diasVencidos = diasVencidos
        this.historico = historico
        this.debito = debito
        this.credito = credito
        this.balancete = balancete
        this.status = status
        this.responsavel = responsavel
    }

    constructor(balancete: Balancete?, responsavel: Responsavel?) : this() {
        this.balancete = balancete
        this.responsavel = responsavel!!
    }



}
