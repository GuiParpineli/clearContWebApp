package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Controle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControleRepository extends JpaRepository<Controle, Long> {
}