package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.CNPJ;
import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComposicaoLancamentosContabeisRepository extends JpaRepository<ComposicaoLancamentosContabeis, Integer> {
    List<ComposicaoLancamentosContabeis> findComposicaoLancamentosContabeisByBalancete_Id(Integer id);
    
    List<ComposicaoLancamentosContabeis> findComposicaoLancamentosContabeisByBalancete_Empresa_CnpjAndBalancete_AnoAndBalancete_Mes(@CNPJ String balancete_empresa_cnpj, Integer balancete_ano, String balancete_mes);
    List<ComposicaoLancamentosContabeis> findComposicaoLancamentosContabeisByResponsavel_Id(Integer id);
}
