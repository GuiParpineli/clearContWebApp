package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.StatusConciliacao;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComposicaoLancamentosContabeisService {
    private final ComposicaoLancamentosContabeisRepository contabeisRepository;
    
    public ComposicaoLancamentosContabeisService(ComposicaoLancamentosContabeisRepository contabeisRepository) {
        this.contabeisRepository = contabeisRepository;
    }
    
    public List<ComposicaoLancamentosContabeis> getAll() {
        return contabeisRepository.findAll();
    }
    
    public ComposicaoLancamentosContabeis getByID(Long id) {
        return contabeisRepository.findById(id).orElseThrow();
    }
    
    public int getTotalOpen(Integer responsavelID) {
        List<ComposicaoLancamentosContabeis> contabeisList = contabeisRepository.
                findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID);
        int total = 0;
        for (ComposicaoLancamentosContabeis contabeis : contabeisList) {
            if (contabeis.getStatus().equals(StatusConciliacao.OPEN)) {
                total += 1;
            }
        }
        return total;
    }
    
    public int getTotalProgress(Integer responsavelID) {
        List<ComposicaoLancamentosContabeis> contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID);
        int total = 0;
        for (ComposicaoLancamentosContabeis contabeis : contabeisList) {
            if (contabeis.getStatus().equals(StatusConciliacao.PROGRESS)) {
                total += 1;
            }
        }
        return total;
    }
    
    public int getTotalFinish(Integer responsavelID) {
        List<ComposicaoLancamentosContabeis> contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID);
        int total = 0;
        for (ComposicaoLancamentosContabeis contabeis : contabeisList) {
            if (contabeis.getStatus().equals(StatusConciliacao.CLOSED)) {
                total += 1;
            }
        }
        return total;
    }
}
