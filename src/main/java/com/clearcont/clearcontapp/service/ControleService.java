package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.Controle;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ControleService {
    private final BalanceteService balanceteService;

    public ControleService(BalanceteService balanceteService) {
        this.balanceteService = balanceteService;
    }

    public @NotNull List<Controle> getAllByMonthAndCompanyID(Long id, String month, Integer year) {
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
                                        balancete.getDoubleTotalBalancete(),
                                        balancete.getComposicaoLancamentosContabeisList().stream().mapToDouble(
                                                ComposicaoLancamentosContabeis::getDoubleSaldoContabil).sum(),
                                        balancete.getComposicaoLancamentosContabeisList()
                                                .stream().mapToDouble(ComposicaoLancamentosContabeis::getDoubleSaldoContabil)
                                                .sum() - balancete.getDoubleTotalBalancete(),
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
