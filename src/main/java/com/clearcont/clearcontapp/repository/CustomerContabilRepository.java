package com.clearcont.clearcontapp.repository;

import com.clearcont.clearcontapp.model.CustomerContabil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerContabilRepository extends JpaRepository<CustomerContabil, Long> {
}