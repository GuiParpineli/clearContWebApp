package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Balancete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceteRepository extends JpaRepository<Balancete, Integer> {
}
