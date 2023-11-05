package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Responsavel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsavelRepository extends JpaRepository<Responsavel, Integer> {
}
