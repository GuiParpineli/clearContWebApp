package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.ComposicaoDePendencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComposicaoDePendenciaRepository extends JpaRepository<ComposicaoDePendencia, Integer> {
}
