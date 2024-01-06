package com.clearcont.clearcontapp;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.Empresa;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.repository.BalanceteRepository;
import com.clearcont.clearcontapp.repository.ClienteRepository;
import com.clearcont.clearcontapp.repository.ControleRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements ApplicationRunner {
    private final BalanceteRepository balanceteRepository;
    private final ClienteRepository clienteRepository;
    private final ControleRepository controleRepository;
    
    public DataLoader(BalanceteRepository balanceteRepository,
                      ClienteRepository clienteRepository, ControleRepository controleRepository) {
        this.balanceteRepository = balanceteRepository;
        this.clienteRepository = clienteRepository;
        this.controleRepository = controleRepository;
    }
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        
        Empresa empresa = clienteRepository.save(
                new Empresa(
                        null,
                        "Empresa A ",
                        "01.001.001/0001-01",
                        "cientea@gmail.com"
                ));
        
        Empresa empresa2 = clienteRepository.save(
                new Empresa(
                        null,
                        "Empresa b ",
                        "02.001.001/0001-01",
                        "cienteb@gmail.com"
                ));
        
        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .empresa(empresa)
                .id(null)
                .nomeConta("BANCO ITAU")
                .numeroConta(375)
                .mes("JANEIRO")
                .ano(2024)
                .totalBalancete(248.36334).build());
        
        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .empresa(empresa)
                .id(null)
                .nomeConta("BANCO ITAU")
                .numeroConta(375)
                .mes("JANEIRO")
                .ano(2024)
                .totalBalancete(248.36334).build());
        
        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .empresa(empresa2)
                .id(null)
                .nomeConta("BANCO BRADESCO")
                .numeroConta(379)
                .ano(2023)
                .mes("DEZEMBRO")
                .totalBalancete(9948.36334).build());
        
        controleRepository.save(
                new Controle(
                        null,
                        "ATIVO",
                        "Sim",
                        "BRADESCO",
                        10.219,
                        100.0,
                        99.00,
                        "STATUS",
                        "Obervacoes ",
                        true,
                        false,
                        LocalDate.now(),
                        null,
                        empresa
                )
        );
        
    }
}
