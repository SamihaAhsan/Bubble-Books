package com.bubblebooks.bubblebooks.security;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;


public class SecurityUser implements UserDetails {

    private final User User;

    public SecurityUser(User User) {
        this.User = User;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return User.getPassword();
    }

    @Override
    public String getUsername() {
        return User.getUsername();
    }

    @Override public boolean isAccountNonExpired() { 
        return true; 
    }
    @Override 
    public boolean isAccountNonLocked() { 
        return true; }

    @Override public boolean isCredentialsNonExpired() { 
        return true; 
    }
    @Override public boolean isEnabled() { 
        return true; 
    }
}