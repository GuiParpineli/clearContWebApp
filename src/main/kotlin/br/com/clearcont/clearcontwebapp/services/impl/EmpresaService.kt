package br.com.clearcont.clearcontwebapp.services.impl

import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.repositories.EmpresaRepository
import org.slf4j.LoggerFactory.getLogger
import org.springframework.stereotype.Service

@Service
class EmpresaService(val repository: EmpresaRepository) {
    private val log = getLogger(this.javaClass)

    fun getAll(): MutableList<Empresa> = repository.findAll()
    fun getById(id: Long): Empresa = repository.findById(id).orElseThrow()

    fun save(empresa: Empresa): Empresa {
        log.info("Saving empresa: $empresa")
        return repository.save(empresa)
    }

    fun delete(empresa: Empresa) {
        log.info("Deleting empresa: $empresa")
        repository.delete(empresa)
    }

    fun update(empresa: Empresa): Empresa {
        log.info("Updating empresa: $empresa")
        return repository.saveAndFlush(empresa)
    }
}
