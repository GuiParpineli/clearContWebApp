package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.views.main.MainLayout;
import com.storedobject.chart.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "dashboard", layout = MainLayout.class)
@PageTitle("Dashboard | Nome do Aplicativo")
public class DashboardView extends FlexLayout {

    public DashboardView() {
        // Creating a chart display area.
        SOChart soChart = new SOChart();
        soChart.setSize("800px", "500px");

// Let us define some inline data.
        CategoryData labels = new CategoryData("Banana", "Apple", "Orange", "Grapes");
        Data data = new Data(25, 40, 20, 30);

// We are going to create a couple of charts. So, each chart should be positioned
// appropriately.
// Create a self-positioning chart.
        NightingaleRoseChart nc = new NightingaleRoseChart(labels, data);
        Position p = new Position();
        p.setTop(Size.percentage(50));
        nc.setPosition(p); // Position it leaving 50% space at the top

// Second chart to add.
        BarChart bc = new BarChart(labels, data);
        RectangularCoordinate rc;
        rc = new RectangularCoordinate(new XAxis(DataType.CATEGORY), new YAxis(DataType.NUMBER));
        p = new Position();
        p.setBottom(Size.percentage(55));
        rc.setPosition(p); // Position it leaving 55% space at the bottom
        bc.plotOn(rc); // Bar chart needs to be plotted on a coordinate system

// Just to demonstrate it, we are creating a "Download" and a "Zoom" toolbox button.
        Toolbox toolbox = new Toolbox();
        toolbox.addButton(new Toolbox.Download());

// Let's add some titles.
        Title title = new Title("My First Chart");
        title.setSubtext("2nd Line of the Title");

// Add the chart components to the chart display area.
        soChart.add(nc, bc, toolbox, title);

        Div div = new Div(soChart);
        VerticalLayout horizontalLayout = new VerticalLayout(div);
        horizontalLayout.setAlignItems(Alignment.CENTER);
        horizontalLayout.setAlignSelf(Alignment.CENTER);
        horizontalLayout.setHorizontalComponentAlignment(Alignment.CENTER);
        horizontalLayout.getStyle().setMargin("25px");
// Now, add the chart display (which is a Vaadin Component) to your layout.
        this.setAlignContent(ContentAlignment.CENTER);
        add(horizontalLayout);
    }
}