package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.model.Responsavel;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import com.clearcont.clearcontapp.repository.ControleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class ControleService {
    private final ControleRepository repository;
    private final BalanceteService balanceteService;
    
    public ControleService(ControleRepository repository, BalanceteService balanceteService) {
        this.repository = repository;
        this.balanceteService = balanceteService;
    }
    
    public List<Controle> getAllByMonthAndCompanyID(Integer id, String month, Integer year) {
        List<Balancete> byCompanyAndPeriod = balanceteService.getByCompanyAndPeriod(id, month, year);
        List<Controle> controles = new ArrayList<>();
        byCompanyAndPeriod.forEach(
                balancete -> {
                    if (!balancete.getComposicaoLancamentosContabeisList().isEmpty())
                        controles.add(
                                new Controle(
                                        null,
                                        null,
                                        balancete.getClassificacao(),
                                        balancete.getNomeConta(),
                                        balancete.getTotalBalancete(),
                                        balancete.getComposicaoLancamentosContabeisList().stream().mapToDouble(
                                                ComposicaoLancamentosContabeis::getDoubleSaldoContabil).sum(),
                                        balancete.getComposicaoLancamentosContabeisList()
                                                .stream().mapToDouble(ComposicaoLancamentosContabeis::getDoubleSaldoContabil).sum() - balancete.getTotalBalancete(),
                                        "ABERTO",
                                        "",
                                        false,
                                        false,
                                        LocalDate.now(),
                                        balancete.getComposicaoLancamentosContabeisList().getFirst().getResponsavel().getNome(),
                                        balancete.getEmpresa()
                                ));
                }
        );
        return controles;
    }
}
