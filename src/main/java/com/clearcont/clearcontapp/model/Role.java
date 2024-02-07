package com.clearcont.clearcontapp.model;

import lombok.Getter;

@Getter
public enum Role {
    USER("user"), ADMIN("admin"), SUPER_ADMIN("superAdmin");
    
    private final String roleName;
    
    Role(String roleName) {
        this.roleName = roleName;
    }
    
}
