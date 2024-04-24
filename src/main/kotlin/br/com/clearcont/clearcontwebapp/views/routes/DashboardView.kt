package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.views.components.MainLayout
import com.storedobject.chart.*
import com.vaadin.flow.component.UI
import com.vaadin.flow.component.combobox.ComboBox
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import jakarta.annotation.security.RolesAllowed
import java.util.logging.Logger


@Route(value = "dashboard", layout = MainLayout::class)
@PageTitle("Dashboard")
@RolesAllowed("ADMIN")
class DashboardView(
    responsavelRepository: ResponsavelRepository,
    empresaRepository: EmpresaRepository,
    cLContabeisService: ComposicaoLancamentosContabeisService
) : FlexLayout(), MonthAndCompany {
    override var month: String? = null
    override lateinit var empresa: Empresa
    private var totalOpen = 0
    private var totalProgress = 0
    private var totalFinish = 0
    var log: Logger = Logger.getLogger(javaClass.name)

    init {
        getCompany(empresaRepository) { empresa: Empresa? ->
            verifySelectedCompanyAndMonthExistAndNavigate(empresa)
            val responsaveisList = responsavelRepository.findResponsavelByEmpresa_Id(
                empresa!!.id
            )
            val responsavelPicker = ComboBox<String?>("Selecione o Responsável")

            responsavelPicker.setItems(
                responsaveisList.stream()
                    .map { responsavel -> "${responsavel?.id} - ${responsavel?.nome}" }
                    .toList()
            )

            val soChart = SOChart()
            soChart.setSize("800px", "500px")
            if (responsavelPicker.value == null) {
                responsavelPicker.value = "${responsaveisList.first()?.id} - ${responsaveisList.first()?.nome}"
            }
            val split = responsavelPicker.value!!.split(" - ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
            val responsavelID = split[0].toLong()
            totalOpen = cLContabeisService.getTotalOpen(responsavelID)
            totalProgress = cLContabeisService.getTotalProgress(responsavelID)
            totalFinish = cLContabeisService.getTotalFinish(responsavelID)

            val labels = CategoryData("Em Aberto", "Em Andamento", "Finalizados")

            val data = Data(totalOpen, totalProgress, totalFinish)

            val nc = NightingaleRoseChart(labels, data)
            var p = Position()
            p.setTop(Size.percentage(50))
            nc.setPosition(p) // Position it leaving 50% space at the top

            val bc = BarChart(labels, data)
            val rc = RectangularCoordinate(XAxis(DataType.CATEGORY), YAxis(DataType.NUMBER))
            p = Position()
            p.setBottom(Size.percentage(55))
            rc.setPosition(p) // Position it leaving 55% space at the bottom
            bc.plotOn(rc) // Bar chart needs to be plotted on a coordinate system

            val toolbox = Toolbox()
            toolbox.addButton(Toolbox.Download())

            soChart.add(nc, bc, toolbox)

            val div = Div(soChart)
            val horizontalLayout = VerticalLayout(responsavelPicker, div)
            horizontalLayout.alignItems = FlexComponent.Alignment.CENTER
            horizontalLayout.setAlignSelf(FlexComponent.Alignment.CENTER)
            horizontalLayout.setHorizontalComponentAlignment(FlexComponent.Alignment.CENTER)
            horizontalLayout.style.setMargin("25px")
            this.alignContent = ContentAlignment.CENTER

            responsavelPicker.addValueChangeListener {
                if (responsavelPicker.value == null) {
                    responsavelPicker.value = "${responsaveisList.first()?.id}  -  ${responsaveisList.first()?.nome}"
                }
                val splitLambda =
                    responsavelPicker.value!!.split(" - ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                val responsavelIDL = splitLambda[0].toLong()
                totalOpen = cLContabeisService.getTotalOpen(responsavelIDL)
                totalProgress = cLContabeisService.getTotalProgress(responsavelIDL)
                totalFinish = cLContabeisService.getTotalFinish(responsavelIDL)
                data[0] = totalOpen
                data[1] = totalProgress
                data[2] = totalFinish
                try {
                    soChart.updateData(
                        data
                    )
                } catch (e: Exception) {
                    throw RuntimeException(e)
                }
            }
            add(horizontalLayout)
        }
    }

    private fun verifySelectedCompanyAndMonthExistAndNavigate(empresa: Empresa?) {
        if (empresa?.nomeEmpresa == null) {
            Notification.show("Selecione uma empresa e periodo")
            UI.getCurrent().navigate("/")
        }
    }
}
