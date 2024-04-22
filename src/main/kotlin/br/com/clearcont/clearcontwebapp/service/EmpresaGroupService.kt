package br.com.clearcont.clearcontwebapp.service

import br.com.clearcont.clearcontwebapp.models.EmpresaGroup
import br.com.clearcont.clearcontwebapp.repository.EmpresaGroupRepository
import org.springframework.stereotype.Service


@Service
class EmpresaGroupService(private val repository: EmpresaGroupRepository) {
    fun getByID(id: Long): EmpresaGroup {
        return repository.findById(id).orElseThrow()
    }

    fun update(empresaGroup: EmpresaGroup): EmpresaGroup {
        return repository.saveAndFlush(empresaGroup)
    }
}
