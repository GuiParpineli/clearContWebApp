package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.helpers.CookieFactory;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.annotation.security.PermitAll;
import jakarta.transaction.Transactional;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("Balancete | ClearCont App")
@PermitAll
@Setter
@Transactional
@Slf4j
public class BalanceteView extends Div {
    String month;
    Empresa empresa;
    
    private void getCompany(EmpresaRepository empresaRepository, Consumer<Empresa> callback) {
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        page.executeJs("return localStorage.getItem($0)", "company-name")
                .then(item -> {
                    setEmpresa(empresaRepository.findEmpresaByNomeEmpresa(item.asString()).orElseThrow());
                    System.out.println("Valor do localStorage para 'company-name': " + item.asString());
                    callback.accept(empresa);
                });
    }
    
    private void getMonth(Consumer<String> callback) {
        UI ui = UI.getCurrent();
        Page page = ui.getPage();
        page.executeJs("return localStorage.getItem($0)", "month")
                .then(item -> {
                    setMonth(item.asString());
                    System.out.println("Valor do localStorage para 'month': " + item.asString());
                    callback.accept(month);
                });
    }
    
    public BalanceteView(BalanceteService service, EmpresaRepository empresaRepository) {
        getCompany(empresaRepository, empresa -> getMonth(month -> {
            
            CookieFactory cookieFactory = new CookieFactory(VaadinService.getCurrentResponse());
            Integer id = empresa.getId();
//        String month = this.month == null ? "JANEIRO" : this.month;
            log.info("MES DO BALANCETE: " + month + ", " + " PERFIL ID: " + id);
            
            List<Balancete> balanceteData = service.getByCompanyAndPeriod(id, month, 2024);
            
            log.info("TAMANHO TOTAL DA LISTA BALANCETE: " + balanceteData.size());
            
            GridCrud<Balancete> grid = new GridCrud<>(Balancete.class);
            DefaultCrudFormFactory<Balancete> formFactory = new DefaultCrudFormFactory<>(Balancete.class);
            formFactory.setVisibleProperties("nomeConta", "numeroConta", "totalBalancete", "classificacao");
            grid.setCrudFormFactory(formFactory);
            grid.getGrid().setColumns("nomeConta", "numeroConta", "totalBalancete", "classificacao");
            grid.getGrid().setColumnReorderingAllowed(true);
            grid.getStyle().set("border-radius", "10px");
            grid.setAddOperation(service::save);
            grid.setUpdateOperation(service::update);
            grid.setDeleteOperation(service::delete);
            grid.setFindAllOperation(() -> balanceteData);
            grid.getGrid().addComponentColumn(balanceteComp -> {
                Button editButton = new Button("Conciliar");
                editButton.addClickListener(
                        e -> UI.getCurrent().navigate("detail/" + balanceteComp.getId())
                );
                return editButton;
            }).setWidth("150px").setFlexGrow(0);
            
            grid.getGrid().addItemDoubleClickListener(event -> {
                Balancete balancete = event.getItem();
                UI.getCurrent().navigate("detail/" + balancete.getId());
            });
            
            Button btnUploadFile = new Button("Enviar Arquivo");
            
            MemoryBuffer memoryBuffer = new MemoryBuffer();
            Upload singleFileUpload = new Upload(memoryBuffer);
            
            singleFileUpload.addSucceededListener(event -> {
                try {
                    Workbook workbook = new XSSFWorkbook(memoryBuffer.getInputStream());
                    Sheet sheet = workbook.getSheetAt(0);
                    Iterator<Row> rowIterator = sheet.iterator();
                    if (rowIterator.hasNext()) rowIterator.next();
                    List<Balancete> balancetes = new ArrayList<>();
                    while (rowIterator.hasNext()) {
                        Row row = rowIterator.next();
                        balancetes.add(new Balancete(
                                0,
                                empresa,
                                row.getCell(1).getStringCellValue(),
                                (int) row.getCell(0).getNumericCellValue(),
                                row.getCell(2).getNumericCellValue(),
                                row.getCell(3).getStringCellValue(),
                                month,
                                LocalDate.now().getYear(),
                                List.of(new ComposicaoLancamentosContabeis())
                        ));
                        service.saveAll(empresa.getId(), balancetes);
                        UI.getCurrent().getPage().reload();
                        log.info("TAMANHO BALANTE INSERIDO : " + balancetes.size());
                        
                    }
                    workbook.close();
                } catch (IOException e) {
                    log.error("ERRO: " + e.getMessage());
                }
            });
            
            add(grid, singleFileUpload);
        }));
    }
}
