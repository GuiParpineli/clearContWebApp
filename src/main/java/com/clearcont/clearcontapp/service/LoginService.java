package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.EmpresaGroup;
import com.clearcont.clearcontapp.model.UserApp;
import com.clearcont.clearcontapp.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserAppService service;
    
    public LoginService(JwtUtil jwtUtil, AuthenticationManager authenticationManager, UserAppService service) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.service = service;
    }
    
    public UserApp Login(String username) {
        UserApp saved = service.loadUserByUsername(username);
        
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        saved.getUsername(),
                        saved.getPassword())
                );
        
        String jwt = jwtUtil.generateToken(saved);
        saved.setJwt(jwt);
        return saved;
    }
}
