package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.ComposicaoLancamentosContabeis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComposicaoLancamentosContabeisRepository extends JpaRepository<ComposicaoLancamentosContabeis, Integer> {
}
