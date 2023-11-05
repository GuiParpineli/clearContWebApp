package com.clearcont.clearcontapp;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.Cliente;
import com.clearcont.clearcontapp.repository.BalanceteRepository;
import com.clearcont.clearcontapp.repository.ClienteRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final BalanceteRepository balanceteRepository;
    private final ClienteRepository clienteRepository;

    public DataLoader(BalanceteRepository balanceteRepository,
                      ClienteRepository clienteRepository) {
        this.balanceteRepository = balanceteRepository;
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Cliente cliente = clienteRepository.save(new Cliente());
        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .cliente(cliente)
                .id(0)
                .nomeConta("BANCO ITAU")
                .numeroConta(375)
                .totalBalancete(248.36334).build());

    }
}
