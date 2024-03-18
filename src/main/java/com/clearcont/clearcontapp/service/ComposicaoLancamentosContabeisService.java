package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import com.clearcont.clearcontapp.model.CustomerContabil;
import com.clearcont.clearcontapp.model.StatusConciliacao;
import com.clearcont.clearcontapp.repository.ComposicaoLancamentosContabeisRepository;
import com.clearcont.clearcontapp.repository.CustomerContabilRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.crudui.crud.impl.GridCrud;

import java.text.DecimalFormat;
import java.util.List;

import static com.clearcont.clearcontapp.helpers.DecimalFormatBR.getDecimalFormat;

@Service
public class ComposicaoLancamentosContabeisService {

    private final EntityManager entityManager;
    private final ComposicaoLancamentosContabeisRepository contabeisRepository;
    private final CustomerContabilRepository customerRepository;

    public ComposicaoLancamentosContabeisService(EntityManager entityManager, ComposicaoLancamentosContabeisRepository contabeisRepository, CustomerContabilRepository customerRepository) {
        this.entityManager = entityManager;
        this.contabeisRepository = contabeisRepository;
        this.customerRepository = customerRepository;
    }

    public @NotNull List<ComposicaoLancamentosContabeis> getAll() {
        return contabeisRepository.findAll();
    }

    public @NotNull ComposicaoLancamentosContabeis getByID(@NotNull Long id) {
        return contabeisRepository.findById(id).orElse(new ComposicaoLancamentosContabeis());
    }

    public void save(@NotNull ComposicaoLancamentosContabeis entity) {
        contabeisRepository.save(entity);
    }

    public void deleteByID(@NotNull Long id) {
        contabeisRepository.deleteById(id);
    }

    public List<ComposicaoLancamentosContabeis> getByBalanceteID(Long id) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(id);
    }

    public List<ComposicaoLancamentosContabeis> getByYearMonthAndCnpj(String cnpj, Integer year, String month) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(cnpj, year, month);
    }

    public void update(@NotNull ComposicaoLancamentosContabeis entity) {
        contabeisRepository.saveAndFlush(entity);
    }


    public double getSaldoContabil(Long balanceteId) {
        return contabeisRepository.findComposicaoLancamentosContabeisByBalancete_Id(balanceteId)
                .stream().mapToDouble((ComposicaoLancamentosContabeis::getDoubleSaldoContabil)).sum();
    }

    public void atualizarSaldoContabil(Long balanceteId, @NotNull GridCrud crud) {
        DecimalFormat formatter = getDecimalFormat();
        double saldoContabil = getSaldoContabil(balanceteId);
        crud.getGrid().getColumnByKey("saldoContabil")
                .setFooter("TOTAL SALDO: R$" + formatter.format(saldoContabil));
    }

    public int getTotalOpen(Long responsavelID) {
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

    public int getTotalProgress(Long responsavelID) {
        List<ComposicaoLancamentosContabeis> contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID);
        int total = 0;
        for (ComposicaoLancamentosContabeis contabeis : contabeisList) {
            if (contabeis.getStatus().equals(StatusConciliacao.PROGRESS)) {
                total += 1;
            }
        }
        return total;
    }

    public int getTotalFinish(Long responsavelID) {
        List<ComposicaoLancamentosContabeis> contabeisList = contabeisRepository.findComposicaoLancamentosContabeisByResponsavel_Id(responsavelID);
        int total = 0;
        for (ComposicaoLancamentosContabeis contabeis : contabeisList) {
            if (contabeis.getStatus().equals(StatusConciliacao.CLOSED)) {
                total += 1;
            }
        }
        return total;
    }



    @Transactional
    public void saveWithCustomer(@NotNull ComposicaoLancamentosContabeis entity, CustomerContabil customer) {
        customerRepository.save(customer);
        entity.setCustomerContabil(customer);
        Balancete mergedBalancete = entityManager.merge(entity.getBalancete());
        entity.setBalancete(mergedBalancete);
        contabeisRepository.save(entity);
    }
}
