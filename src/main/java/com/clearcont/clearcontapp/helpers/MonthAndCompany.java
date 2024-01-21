package com.clearcont.clearcontapp.helpers;

import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.page.Page;

import java.util.function.Consumer;

public interface MonthAndCompany {
//    void setEmpresa(Empresa empresa);
//
//    void setMonth(String month);
//
//    default void getCompany(EmpresaRepository empresaRepository, Consumer<Empresa> callback) {
//        UI ui = UI.getCurrent();
//        Page page = ui.getPage();
//        page.executeJs("return localStorage.getItem($0)", "company-name")
//                .then(item -> {
//                    setEmpresa(empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElseThrow());
//                    System.out.println("Valor do localStorage para 'company-name': " + item.asString());
//                    callback.accept(empresa);
//                });
//    }
//
//    default void getMonth(Consumer<String> callback) {
//        UI ui = UI.getCurrent();
//        Page page = ui.getPage();
//        page.executeJs("return localStorage.getItem($0)", "month")
//                .then(item -> {
//                    setMonth(item.asString());
//                    System.out.println("Valor do localStorage para 'month': " + item.asString());
//                    callback.accept(month);
//                });
//    }

}
