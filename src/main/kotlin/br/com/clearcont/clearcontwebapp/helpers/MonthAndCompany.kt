package br.com.clearcont.clearcontwebapp.helpers

import com.clearcont.clearcontapp.model.Empresa
import com.clearcont.clearcontapp.repository.EmpresaRepository
import com.vaadin.flow.component.UI
import elemental.json.JsonValue
import org.springframework.stereotype.Component
import java.util.function.Consumer

@Component
interface MonthAndCompany {
    var month: String?

    var empresa: Empresa?

    fun getCompany(empresaRepository: EmpresaRepository, callback: Consumer<Empresa?>) {
        val ui = UI.getCurrent()
        val page = ui.page
        page.executeJs("return sessionStorage.getItem($0)", "company-name")
            .then { item: JsonValue ->
                empresa = empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElse(Empresa())
                callback.accept(empresa)
            }
    }

    fun getMonth(callback: Consumer<String?>) {
        val ui = UI.getCurrent()
        val page = ui.page
        page.executeJs("return sessionStorage.getItem($0)", "month")
            .then { item: JsonValue ->
                month = item.asString()
                callback.accept(month)
            }
    }
}
