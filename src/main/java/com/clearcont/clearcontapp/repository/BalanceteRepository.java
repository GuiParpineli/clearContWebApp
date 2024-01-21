package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Balancete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BalanceteRepository extends JpaRepository<Balancete, Integer> {
    List<Balancete> findBalanceteByEmpresa_IdAndMesAndAno(Integer id, String month, Integer year);
    void deleteAllByEmpresa_Id(Integer id);
}
