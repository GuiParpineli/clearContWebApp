package br.com.clearcont.clearcontwebapp.models

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "application_user")
class ApplicationUser(
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id val id: Long? = null,
    @Column(unique = true) var username: String,
    val name: String,
    @JsonIgnore val hashedPassword: String,
    @ElementCollection(fetch = FetchType.EAGER) @Enumerated(EnumType.STRING) val roles: Set<Role>,
    @Column(length = 1000000) @Lob var profilePicture: ByteArray?,
    @ManyToOne var empresaGroup: EmpresaGroup,
    @JoinColumn(name = "responsavel_id", unique = true)
    @OneToOne(
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
        fetch = FetchType.EAGER
    ) val responsavel: Responsavel?
)
