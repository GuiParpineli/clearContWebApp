package com.clearcont.clearcontapp.helpers;

import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.page.Page;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public interface MonthAndCompany {
    String getMonth();
    
    Empresa getEmpresa();
    
    void setEmpresa(Empresa empresa);
    
    void setMonth(String month);
    
    default void getCompany(@NotNull EmpresaRepository empresaRepository, @NotNull Consumer<Empresa> callback) {
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        page.executeJs("return sessionStorage.getItem($0)", "company-name")
                .then(item -> {
                    setEmpresa(empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElse(new Empresa()));
                    callback.accept(getEmpresa());
                });
    }
    
    default void getMonth(@NotNull Consumer<String> callback) {
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        page.executeJs("return sessionStorage.getItem($0)", "month")
                .then(item -> {
                    setMonth(item.asString());
                    callback.accept(getMonth());
                });
    }
}