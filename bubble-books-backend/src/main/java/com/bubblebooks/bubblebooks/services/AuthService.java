package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.bubblebooks.bubblebooks.repositories.AccountRepo;
import com.bubblebooks.bubblebooks.dto.Logindto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import com.bubblebooks.bubblebooks.security.SecurityUser;

@Service
public class AuthService implements UserDetailsService  {

    @Autowired
    private PasswordEncoder passwordEncoder;

    final private AccountRepo accountRepo;

    public AuthService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    
public void signup(User user) {

    // checks whether information meets requirments
     System.out.println("Received username again: " + user.getUsername());
    // Username: VARCHAR(100)
    if (user.getUsername() == null || user.getUsername().isEmpty()) {
        throw new IllegalArgumentException("Username can't be null or empty");
    }
    if (user.getUsername().length() > 100 || user.getUsername().length() < 10) {
        throw new IllegalArgumentException("Username cannot exceed 100 characters and must be at least 10 characters");
    }
    // First name: VARCHAR(100)
    if (user.getFirstName() == null || user.getFirstName().isEmpty()) {
        throw new IllegalArgumentException("First name can't be null or empty");
    }
    if (user.getFirstName().length() > 100) {
        throw new IllegalArgumentException("First name cannot exceed 100 characters");
    }

    // Last name: VARCHAR(100)
    if (user.getLastName() == null || user.getLastName().isEmpty()) {
        throw new IllegalArgumentException("Last name can't be null or empty");
    }
    if (user.getLastName().length() > 100) {
        throw new IllegalArgumentException("Last name cannot exceed 100 characters");
    }
    // City: VARCHAR(175)
    if (user.getCity() == null || user.getCity().isEmpty()) {
        throw new IllegalArgumentException("City can't be null or empty");
    }
    if (user.getCity().length() > 175) {
        throw new IllegalArgumentException("City cannot exceed 175 characters");
    }
    // Country: VARCHAR(80)
    if (user.getCountry() == null || user.getCountry().isEmpty()) {
        throw new IllegalArgumentException("Country can't be null or empty");
    }
    if (user.getCountry().length() > 80) {
        throw new IllegalArgumentException("Country cannot exceed 80 characters");
    }

    // Email: VARCHAR(254)
    if (user.getEmail() == null || user.getEmail().isEmpty()) {
        throw new IllegalArgumentException("Email can't be null or empty");
    }
    if (user.getEmail().length() > 254) {
        throw new IllegalArgumentException("Email cannot exceed 254 characters");
    }

    //checks for existing username and email
    if (accountRepo.existsByUsername(user.getUsername())) {
        throw new IllegalArgumentException("Username already exists");
    }


    if (accountRepo.existsByEmail(user.getEmail())) {
        throw new IllegalArgumentException("Email already exists");
    }

    System.out.println("Encoded password: " + user.getPassword());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    

    // saves user to database
    accountRepo.save(user);

}

    public UserDetails loadUserByUsername(String username) {
        return accountRepo.findByUsername(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
/* 
    public User login(Logindto login) {
        
        // checks whether information meets requirments
        if (login.getUsername() == null || login.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username can't be null or empty");
        }
        
        if (!(accountRepo.existsByUsername(login.getUsername()))){
            throw new IllegalArgumentException("Username does not exist");
        }
        
        if (!accountRepo.findByUsername(login.getUsername()).getPassword().equals(login.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return new User(
            accountRepo.findByUsername(login.getUsername()).getId(),
            accountRepo.findByUsername(login.getUsername()).getUsername(),
            accountRepo.findByUsername(login.getUsername()).getFirstName(),
            accountRepo.findByUsername(login.getUsername()).getLastName(),
            accountRepo.findByUsername(login.getUsername()).getCity(),
            accountRepo.findByUsername(login.getUsername()).getCountry(),
            accountRepo.findByUsername(login.getUsername()).getEmail(),
            accountRepo.findByUsername(login.getUsername()).getPassword()
        );
    }*/

}
