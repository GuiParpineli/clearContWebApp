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
}
