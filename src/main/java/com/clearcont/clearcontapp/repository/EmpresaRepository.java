package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findEmpresaByNomeEmpresa(String nome);
}