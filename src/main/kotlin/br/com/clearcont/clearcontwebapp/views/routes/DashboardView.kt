package br.com.clearcont.clearcontwebapp.views.routes

import br.com.clearcont.clearcontwebapp.helpers.MonthAndCompany
import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.models.Responsavel
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import br.com.clearcont.clearcontwebapp.repository.ResponsavelRepository
import br.com.clearcont.clearcontwebapp.service.ComposicaoLancamentosContabeisService
import br.com.clearcont.clearcontwebapp.views.MainLayout
import com.storedobject.chart.*
import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent
import com.vaadin.flow.component.combobox.ComboBox
import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexLayout
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import jakarta.annotation.security.RolesAllowed
import java.util.function.Function


@Route(value = "dashboard", layout = MainLayout::class)
@PageTitle("Dashboard")
@RolesAllowed("ADMIN")
class DashboardView(
    responsavelRepository: ResponsavelRepository,
    empresaRepository: EmpresaRepository?,
    cLContabeisService: ComposicaoLancamentosContabeisService
) : FlexLayout(), MonthAndCompany {
    override var month: String? = null
    override var empresa: Empresa? = null
    private val totalOpen = 0
    private val totalProgress = 0
    private val totalFinish = 0

    init {
        getCompany(empresaRepository!!) { empresa: Empresa? ->
            val responsaveisList = responsavelRepository.findResponsavelByEmpresa_Id(
                empresa!!.id
            )
            val responsavelPicker = ComboBox<String?>("Selecione o Responsável")

            responsavelPicker.setItems(responsaveisList.stream()
                .map<String>(Function<Responsavel, String> { responsavel: Responsavel -> responsavel.getId() + " - " + responsavel.nome })
                .toList()
            )

            val soChart = SOChart()
            soChart.setSize("800px", "500px")
            if (responsavelPicker.value == null) {
                responsavelPicker.setValue(responsaveisList.first.getId() + " - " + responsaveisList.first.nome)
            }
            val split = responsavelPicker.value!!.split(" - ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
            val responsavelID = split[0].toLong()
            setTotalOpen(cLContabeisService.getTotalOpen(responsavelID))
            setTotalProgress(cLContabeisService.getTotalProgress(responsavelID))
            setTotalFinish(cLContabeisService.getTotalFinish(responsavelID))

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

            responsavelPicker.addValueChangeListener { click: ComponentValueChangeEvent<ComboBox<String?>?, String?>? ->
                if (responsavelPicker.value == null) {
                    responsavelPicker.setValue(responsaveisList.first.getId() + " - " + responsaveisList.first.nome)
                }
                val splitLambda =
                    responsavelPicker.value!!.split(" - ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                val responsavelIDL = splitLambda[0].toLong()
                setTotalOpen(cLContabeisService.getTotalOpen(responsavelIDL))
                setTotalProgress(cLContabeisService.getTotalProgress(responsavelIDL))
                setTotalFinish(cLContabeisService.getTotalFinish(responsavelIDL))
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
}
