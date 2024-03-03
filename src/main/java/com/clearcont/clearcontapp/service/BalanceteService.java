package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.repository.BalanceteRepository;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceteService {
    private final BalanceteRepository repository;

    public BalanceteService(BalanceteRepository repository) {
        this.repository = repository;
    }

    public @NotNull List<Balancete> getAll() {
        return repository.findAll();
    }

    public @NotNull Balancete getById(@NotNull Long balanceteId) {
        return repository.findById(balanceteId).get();
    }

    public List<Balancete> getByCompanyAndPeriod(Long id, String mes, Integer ano) {
        return repository.findBalanceteByEmpresa_IdAndMesAndAno(id, mes, ano);
    }

    public void delete(@NotNull Balancete balancete) {
        repository.delete(balancete);
    }

    public @NotNull Balancete update(@NotNull Balancete balancete) {
        return repository.saveAndFlush(balancete);
    }

    public @NotNull Balancete save(@NotNull Balancete balancete) {
        return repository.save(balancete);
    }

    @Transactional
    public void saveAll(Long id, @NotNull List<Balancete> balancetes) {
        repository.deleteAllByEmpresa_Id(id);
        repository.saveAll(balancetes);
    }
}