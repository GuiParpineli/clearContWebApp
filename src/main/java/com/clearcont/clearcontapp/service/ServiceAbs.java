package com.clearcont.clearcontapp.service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.logging.Logger;

public abstract class ServiceAbs implements IService {
    private final Logger logger;

    protected ServiceAbs(Logger logger) {
        this.logger = logger;
    }
}
