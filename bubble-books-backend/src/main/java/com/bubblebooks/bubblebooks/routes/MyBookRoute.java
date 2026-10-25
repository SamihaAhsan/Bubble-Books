package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bubblebooks.bubblebooks.services.AuthService;

import jakarta.validation.Valid;

public class MyBookRoute {
    
    private final MyBookService authService;

    public MyBookRoute(MyBookService authService) {
        this.authService = authService;
    }

    @PostMapping("/my-genres")
    public ResponseEntity<User> signup(@Valid @RequestBody User user) {
        System.out.println("Received username: " + user.getUsername());
        authService.signup(user);
        return ResponseEntity.ok(user);}

    
         @PostMapping("/my-books")
    public ResponseEntity<User> signup(@Valid @RequestBody User user) {
        System.out.println("Received username: " + user.getUsername());
        authService.signup(user);
        return ResponseEntity.ok(user);}
     

       

}
