package com.clearcont.clearcontapp.helpers;

import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.page.Page;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public interface MonthAndCompany {
    String getMonth();
    
    Empresa getEmpresa();
    
    void setEmpresa(Empresa empresa);
    
    void setMonth(String month);
    
    UI ui = UI.getCurrent();
    Page page = ui.getPage();
    
    default void getCompany(EmpresaRepository empresaRepository, Consumer<Empresa> callback) {
        page.executeJs("return localStorage.getItem($0)", "company-name")
                .then(item -> {
                    setEmpresa(empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElseThrow());
                    callback.accept(getEmpresa());
                });
    }
    
    default void getMonth(Consumer<String> callback) {
        page.executeJs("return localStorage.getItem($0)", "month")
                .then(item -> {
                    setMonth(item.asString());
                    callback.accept(getMonth());
                });
    }
}
