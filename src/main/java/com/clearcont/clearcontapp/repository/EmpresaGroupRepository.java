package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.EmpresaGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaGroupRepository extends JpaRepository<EmpresaGroup, Long> {
}