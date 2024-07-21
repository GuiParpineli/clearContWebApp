package br.com.clearcont.clearcontwebapp.models

import br.com.clearcont.clearcontwebapp.models.enums.Role
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

@Entity
@Table(name = "application_user")
class ApplicationUser(
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id val id: Long? = null,
    @Column(unique = true, length = 15) var username: String,
    @Column(length = 50) var name: String,
    @NotBlank @Column(length = 150) @JsonIgnore var password: String,
    @ElementCollection(fetch = FetchType.EAGER) @Enumerated(EnumType.STRING) var roles: MutableSet<Role>,
    @Column(length = 1000000) @Lob var profilePicture: ByteArray?,
    @ManyToOne var empresaGroup: EmpresaGroup,
    @JoinColumn(name = "responsavel_id", unique = true)
    @OneToOne(
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
        fetch = FetchType.EAGER
    ) val responsavel: Responsavel?
)
