package com.bubblebooks.bubblebooks.routes;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bubblebooks.bubblebooks.models.User;
import com.bubblebooks.bubblebooks.services.AuthService;
import jakarta.validation.Valid;

@RestController
public class AuthRoute {

    private final AuthService authService;

    public AuthRoute(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody User user) {
        authService.signup(user);
        return ResponseEntity.ok(user);
    }

     @GetMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        authService.login(user);
        return ResponseEntity.ok(user);

    }



    }

   


