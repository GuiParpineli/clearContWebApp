package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.Empresa
import br.com.clearcont.clearcontwebapp.repository.EmpresaRepository
import org.springframework.stereotype.Service

@Service
class EmpresaService(val repository: EmpresaRepository) {
    fun getAll(): MutableList<Empresa> = repository.findAll()
    fun getById(id: Long): Empresa = repository.findById(id).orElseThrow()
    fun save(empresa: Empresa): Empresa = repository.save(empresa)
    fun delete(empresa: Empresa) = repository.delete(empresa)
    fun update(empresa: Empresa): Empresa = repository.saveAndFlush(empresa)
}
