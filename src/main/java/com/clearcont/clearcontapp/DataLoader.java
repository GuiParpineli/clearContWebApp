package com.clearcont.clearcontapp;

import com.clearcont.clearcontapp.model.Balancete;
import com.clearcont.clearcontapp.model.Cliente;
import com.clearcont.clearcontapp.model.Controle;
import com.clearcont.clearcontapp.repository.BalanceteRepository;
import com.clearcont.clearcontapp.repository.ClienteRepository;
import com.clearcont.clearcontapp.repository.ControleRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final BalanceteRepository balanceteRepository;
    private final ClienteRepository clienteRepository;
    private final ControleRepository controleRepository;

    public DataLoader(BalanceteRepository balanceteRepository,
                      ClienteRepository clienteRepository, ControleRepository controleRepository) {
        this.balanceteRepository = balanceteRepository;
        this.clienteRepository = clienteRepository;
        this.controleRepository = controleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        Cliente cliente = clienteRepository.save(
                new Cliente(
                        null,
                        "Empresa A ",
                        "01.001.001/0001-01",
                        "cientea@gmail.com"
                ));

        Cliente cliente2 = clienteRepository.save(
                new Cliente(
                        null,
                        "Empresa b ",
                        "02.001.001/0001-01",
                        "cienteb@gmail.com"
                ));

        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .cliente(cliente)
                .id(null)
                .nomeConta("BANCO ITAU")
                .numeroConta(375)
                .totalBalancete(248.36334).build());

        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .cliente(cliente)
                .id(null)
                .nomeConta("BANCO ITAU")
                .numeroConta(375)
                .totalBalancete(248.36334).build());

        balanceteRepository.save(Balancete.builder().classificacao("ATIVO")
                .cliente(cliente2)
                .id(null)
                .nomeConta("BANCO BRADESCO")
                .numeroConta(379)
                .totalBalancete(9948.36334).build());

        controleRepository.save(
                new Controle(
                        null,
                        "ATIVO",
                        "SIm",
                        "BRADESCo",
                        10.219,
                        100.0,
                        99.00,
                        "STATUS",
                        "Obervacoes ",
                        true,
                        false,
                        null,
                        cliente
                )
        );

    }
}
