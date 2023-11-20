package com.clearcont.clearcontapp.views.components.controle;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;

public class TopBarText {
    public static Div make(String... text) {
        Div div = new Div();
        for (String txt : text) {
            div.add(new Paragraph(txt));
        }
        return div;
    }
}
