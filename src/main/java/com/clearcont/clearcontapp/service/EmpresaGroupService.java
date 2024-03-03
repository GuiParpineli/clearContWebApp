package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.EmpresaGroup;
import com.clearcont.clearcontapp.repository.EmpresaGroupRepository;
import org.springframework.stereotype.Service;

@Service
public class EmpresaGroupService {
    private final EmpresaGroupRepository repository;
    
    public EmpresaGroupService(EmpresaGroupRepository repository) {
        this.repository = repository;
    }
    
    public EmpresaGroup getByID(Long id) {
        return repository.findById(id).orElseThrow();
    }
    
}