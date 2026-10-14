package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.stereotype.Service;
import com.bubblebooks.bubblebooks.repositories.AccountRepo;

@Service
public class AuthService {

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
    /*if (accountRepo.existsByUsername(user.getUsername())) {
        throw new IllegalArgumentException("Username already exists");
    }
    if (accountRepo.existsByEmail(user.getEmail())) {
        throw new IllegalArgumentException("Email already exists");
    }*/

    // saves user to database
    accountRepo.save(user);

}

    public void login(User user) {
        // take given info 
    }

}
