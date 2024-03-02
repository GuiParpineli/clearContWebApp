package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnexoRepository extends JpaRepository<Anexo, Long> {
    List<Anexo> findAnexoByComposicaoLancamentosContabeis_Id(Long balanceteID);
}