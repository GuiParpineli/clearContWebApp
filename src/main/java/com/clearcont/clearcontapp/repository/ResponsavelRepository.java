package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Responsavel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponsavelRepository extends JpaRepository<Responsavel, Long> {
    List<Responsavel> findResponsavelByEmpresa_Id(Long id);
}