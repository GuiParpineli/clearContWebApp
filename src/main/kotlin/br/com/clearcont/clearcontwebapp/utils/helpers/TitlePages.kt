package br.com.clearcont.clearcontwebapp.utils.helpers

import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H3
import com.vaadin.flow.theme.lumo.LumoUtility

fun createTitle(text: String): Div {
    val title = H3(text).apply {
        addClassNames(
            LumoUtility.FontWeight.BLACK,
        )
    }
    return getTitleDiv(title)
}

private fun getTitleDiv(titleText: H3): Div {
    return Div(titleText).apply {
        style.setPadding("10px").setBorderRadius("20px")
    }
}
