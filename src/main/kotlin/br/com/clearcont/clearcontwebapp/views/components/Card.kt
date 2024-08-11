package br.com.clearcont.clearcontwebapp.views.components

import com.vaadin.flow.component.orderedlayout.VerticalLayout

class Card : VerticalLayout() {
    init {
        addClassName("card")
        isPadding = true
        isSpacing = true
    }
}
