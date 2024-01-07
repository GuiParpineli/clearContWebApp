package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComposicaoLancamentosContabeisRepository extends JpaRepository<ComposicaoLancamentosContabeis, Integer> {
    List<ComposicaoLancamentosContabeis> findComposicaoLancamentosContabeisByBalancete_Id(Integer id);
}
