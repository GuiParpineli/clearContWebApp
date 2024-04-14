package br.com.clearcont.clearcontwebapp.models.enums


enum class Role(private val roleName: String) {
    USER("applicationUser"), ADMIN("admin"), SUPER_ADMIN("superAdmin")
}
