package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.repository.ControleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ControleService {
    private final ControleRepository repository;

    public ControleService(ControleRepository repository) {
        this.repository = repository;
    }

    public List<Controle> getAll() {
        return repository.findAll();
    }
}
