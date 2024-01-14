package com.clearcont.clearcontapp.views.routes;


import com.clearcont.clearcontapp.helpers.Log;
import com.clearcont.clearcontapp.helpers.Periodo;
import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.repository.EmpresaRepository;
import com.clearcont.clearcontapp.service.BalanceteService;
import com.clearcont.clearcontapp.views.main.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.UploadI18N;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinService;
import jakarta.servlet.http.Cookie;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

@Route(value = "balancete", layout = MainLayout.class)
@PageTitle("Balancete | ClearCont App")
public class BalanceteView extends Div {
    Integer id = 0;
    private final String CLAS_NAME = BalanceteView.class.getSimpleName();
    
    public BalanceteView(BalanceteService service, EmpresaRepository empresaRepository) {
        // Adicionar um novo cookie ao response atual
        Cookie novoCookie = new Cookie("company-id", "1");
        // Definir o tempo de expiração do cookie em segundos
        novoCookie.setMaxAge(60 * 60 * 24); // 24 horas
        // Adicionar o cookie ao response
        VaadinService.getCurrentResponse().addCookie(novoCookie);
        
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("company-id")) {
                id = Integer.valueOf(cookie.getValue());
                Log.log(CLAS_NAME, "O valor do cookie é: " + cookie.getValue());
                break;
            }
        }
        
        Log.log(BalanceteView.class.getSimpleName(),
                "MES DO BALANCETE: " + Periodo.periodo + ", " +
                " PERFIL ID: " + id
        );
        
        List<Balancete> balanceteData = service.getByCompanyAndPeriod(
                id, Periodo.periodo, 2024
        );
        
        Log.log(BalanceteView.class.getSimpleName(),
                "TAMANHO TOTAL DA LISTA BALANCETE: " + balanceteData.size());
        
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
                Empresa empresa = empresaRepository.findById(id).orElseThrow();
                while (rowIterator.hasNext()) {
                    Row row = rowIterator.next();
                    Log.log("CELL", row.getCell(0).toString());
                    balancetes.add(new Balancete(
                            0,
                            empresa,
                            row.getCell(1).getStringCellValue(),
                            (int) row.getCell(0).getNumericCellValue(),
                            row.getCell(2).getNumericCellValue(),
                            row.getCell(3).getStringCellValue(),
                            Periodo.periodo,
                            Periodo.year,
                            List.of(new ComposicaoLancamentosContabeis())
                    ));
                    service.saveAll(balancetes);
                    UI.getCurrent().getPage().reload();
                    Log.log("BALANCETE VIEW: ", "TAMANHO BALANTE INSERIDO : " + balancetes.size());
                    
                }
                workbook.close();
            } catch (IOException e) {
                Log.log("BALANCETEVIEW", "ERRO: " + e.getMessage());
                e.printStackTrace();
            }
        });
        
        
        add(grid, singleFileUpload);
    }
}
