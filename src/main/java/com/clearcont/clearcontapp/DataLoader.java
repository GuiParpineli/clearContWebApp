package com.clearcont.clearcontapp;

import com.clearcont.clearcontapp.model.*;
import com.clearcont.clearcontapp.repository.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataLoader implements ApplicationRunner {
    private final BalanceteRepository balanceteRepository;
    private final EmpresaRepository empresaRepository;
    private final ControleRepository controleRepository;
    private final EmpresaGroupRepository empresaGroupRepository;
    private final ComposicaoLancamentosContabeisRepository composicaoLancamentosContabeisRepository;
    
    public DataLoader(BalanceteRepository balanceteRepository,
                      EmpresaRepository empresaRepository, ControleRepository controleRepository,
                      EmpresaGroupRepository empresaGroupRepository,
                      ComposicaoLancamentosContabeisRepository composicaoLancamentosContabeisRepository) {
        this.balanceteRepository = balanceteRepository;
        this.empresaRepository = empresaRepository;
        this.controleRepository = controleRepository;
        this.empresaGroupRepository = empresaGroupRepository;
        this.composicaoLancamentosContabeisRepository = composicaoLancamentosContabeisRepository;
    }
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        
        Empresa empresa = empresaRepository.save(
                new Empresa(
                        null,
                        "Empresa A ",
                        "01.001.001/0001-01",
                        "cientea@gmail.com"
                ));
        
        Empresa empresa2 = empresaRepository.save(
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
        
        empresaGroupRepository.save(
                new EmpresaGroup(
                        0,
                        "EmpresaGrande",
                        "12345",
                        "empresaGrande@email.com",
                        empresaRepository.findAll())
        );
        
        composicaoLancamentosContabeisRepository.save(
                new ComposicaoLancamentosContabeis(
                        0,
                        LocalDate.now(),
                        "loreash",
                        100.0,
                        200.0,
                        (100.0 - 200.0),
                        "EM ABERTO",
                        balanceteRepository.findAll().getFirst()
                )
        );
    }
}
