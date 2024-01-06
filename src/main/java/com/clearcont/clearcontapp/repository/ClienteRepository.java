package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Empresa, Integer> {
}
