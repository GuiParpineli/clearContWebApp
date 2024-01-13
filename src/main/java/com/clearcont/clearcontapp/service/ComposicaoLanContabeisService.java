package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import org.springframework.stereotype.Service;
import org.vaadin.crudui.crud.impl.GridCrud;

import java.text.DecimalFormat;
import java.util.List;

import static com.clearcont.clearcontapp.helpers.DecimalFormatBR.getDecimalFormat;

@Service
public class ComposicaoLanContabeisService {
    
    private final ComposicaoLancamentosContabeisRepository contabeisRepository;
    
    public ComposicaoLanContabeisService(ComposicaoLancamentosContabeisRepository contabeisRepository) {
        this.contabeisRepository = contabeisRepository;
    }
    
    public List<ComposicaoLancamentosContabeis> getAll() {
        return contabeisRepository.findAll();
    }
    
    public ComposicaoLancamentosContabeis getByID(Integer id) {
        return contabeisRepository.findById(id).orElse(new ComposicaoLancamentosContabeis());
    }
    
    public void save(ComposicaoLancamentosContabeis entity) {
        contabeisRepository.save(entity);
    }
    
    public void deleteByID(Integer id) {
        contabeisRepository.deleteById(id);
    }
    
    public List<ComposicaoLancamentosContabeis> getByBalanceteID(Integer id) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(id);
    }
    
    public List<ComposicaoLancamentosContabeis> getByYearMonthAndCnpj(String cnpj, Integer year, String month) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(cnpj, year, month);
    }
    
    public void update(ComposicaoLancamentosContabeis entity) {
        contabeisRepository.saveAndFlush(entity);
    }
    
    
    public double getSaldoContabil(Integer balanceteId) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(balanceteId)
                .stream().mapToDouble((ComposicaoLancamentosContabeis::getDoubleSaldoContabil)).sum();
    }
    
    public void atualizarSaldoContabil(Integer balanceteId, GridCrud crud) {
        DecimalFormat formatter = getDecimalFormat();
        double saldoContabil = getSaldoContabil(balanceteId);
        crud.getGrid().getColumnByKey("saldoContabil")
                .setFooter("TOTAL SALDO: R$" + formatter.format(saldoContabil));
    }
}
