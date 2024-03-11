package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.CustomerContabil;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CustomerContabilService {
    private final CustomerContabilRepository repository;

    public CustomerContabilService(CustomerContabilRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void save(CustomerContabil customer) {
        repository.save(customer);
    }

    public List<CustomerContabil> findByBalanceteID(Long id) {
        return repository.findAllByComposicaoLancamentosContabeis_Balancete_Id(id);
    }

    public CustomerContabil update(CustomerContabil customerContabil) {
        return repository.saveAndFlush(customerContabil);
    }
}
