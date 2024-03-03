package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.CustomerContabil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerContabilRepository extends JpaRepository<CustomerContabil, Long> {
    List<CustomerContabil> findAllByComposicaoLancamentosContabeis_Balancete_Empresa_Id(Long id);
}