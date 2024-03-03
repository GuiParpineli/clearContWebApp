package com.clearcont.clearcontapp.views.components.controle;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import org.jetbrains.annotations.NotNull;

public class TopBarText {
    public static @NotNull Div make(String @NotNull ... text) {
        Div div = new Div();
        for (String txt : text) {
            div.add(new Paragraph(txt));
        }
        return div;
    }
}