package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.repository.BalanceteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceteService {
    private final BalanceteRepository repository;
    
    public BalanceteService(BalanceteRepository repository) {
        this.repository = repository;
    }
    
    public List<Balancete> getAll() {
        return repository.findAll();
    }
    
    public Balancete getById(Integer balanceteId) {
        return repository.findById(balanceteId).get();
    }
    
    public List<Balancete> getByCompanyAndPeriod(Integer id, String mes, Integer ano) {
        return repository.findBalanceteByEmpresa_IdAndMesAndAno(id, mes, ano);
    }
    
    public void delete(Balancete balancete) {
        repository.delete(balancete);
    }
    
    public Balancete update(Balancete balancete) {
        return repository.saveAndFlush(balancete);
    }
    
    public Balancete save(Balancete balancete) {
        return repository.save(balancete);
    }
}
