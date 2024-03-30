package br.com.clearcont.clearcontwebapp.models

import lombok.Getter

@Getter
enum class Role(private val roleName: String) {
    USER("user"), ADMIN("admin"), SUPER_ADMIN("superAdmin")
}
