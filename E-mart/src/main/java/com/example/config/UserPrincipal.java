package com.example.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.entity.User;
import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private final int userId;  // Store userId
    private final String email;
    private final String password;
    
    private static final long serialVersionUID = -3411314401782990166L;
    
    public UserPrincipal(User user) {
        this.userId = user.getUserId();  // Fetch userId from User entity
        this.email = user.getEmail();
        this.password = user.getPassword();
    }

    public int getUserId() {
        return userId;  // Allow retrieval of userId
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();  // Modify if roles are implemented
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
