package com.clearcont.clearcontapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Set;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "application_user")
public class User extends AbstractEntity {
    
    @Column(unique = true)
    private String username;
    private String name;
    @JsonIgnore
    private String hashedPassword;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
    @Lob
    @Column(length = 1000000)
    private byte[] profilePicture;
    @OneToOne
    EmpresaGroup empresaGroup;
    
    public User(Long id, int version, String username, String name, String hashedPassword, Set<Role> roles, byte[] profilePicture, EmpresaGroup empresaGroup) {
        super(id, version);
        this.username = username;
        this.name = name;
        this.hashedPassword = hashedPassword;
        this.roles = roles;
        this.profilePicture = profilePicture;
        this.empresaGroup = empresaGroup;
    }
}
