package com.clearcont.clearcontapp.model;

import lombok.Getter;

@Getter
public enum Role {
    USER("user"), ADMIN("admin");
    
    private final String roleName;
    
    Role(String roleName) {
        this.roleName = roleName;
    }
    
}
