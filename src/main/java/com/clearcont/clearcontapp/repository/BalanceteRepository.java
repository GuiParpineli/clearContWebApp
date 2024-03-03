package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Balancete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BalanceteRepository extends JpaRepository<Balancete, Long> {
    List<Balancete> findBalanceteByEmpresa_IdAndMesAndAno(Long id, String month, Integer year);
    void deleteAllByEmpresa_Id(Long id);
}