package com.bubblebooks.bubblebooks.services;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.bubblebooks.bubblebooks.repositories.AccountRepo;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.security.core.Authentication;

@Service
public class UserService {
    final private AccountRepo accountRepo;

    public UserService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }
    public UUID accessUserIDString(Authentication authentication) {
        // Implement logic to access user data based on the authenticated user
        String username = authentication.getName();
        User user = accountRepo.findByUsername(username).orElseThrow();
        // Fetch and return user data based on the username
        return user.getId();
    }


}
