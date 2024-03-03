package com.clearcont.clearcontapp.service;

import com.clearcont.clearcontapp.model.User;
import com.clearcont.clearcontapp.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserAppService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    public UserAppService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public @NotNull UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user present with username: " + username);
        } else {
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getHashedPassword(),
                    getAuthorities(user));
        }
    }
    
    public User getUserByUserName(String username) {
        return userRepository.findByUsername(username);
    }
    
    private static @NotNull List<GrantedAuthority> getAuthorities(@NotNull User user) {
        return user.getRoles().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        
    }
    
}