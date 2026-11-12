// package com.bubblebooks.bubblebooks.routes;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;

// import jakarta.validation.Valid;

// public class UserInfoRoute {

//     @PostMapping("/gmail-change")
//     public ResponseEntity<String> gmail_change(@Valid @RequestBody String newGmail) {
//         System.out.println("Received new Gmail: " + newGmail);
//         authService.gmail_change(newGmail);
//         return ResponseEntity.ok("Gmail changed successfully");
//     }

//      @GetMapping("/gmail")
//     public ResponseEntity<User> signup(@Valid @RequestBody User user) {
//         System.out.println("Received username: " + user.getUsername());
//         authService.signup(user);
//         return ResponseEntity.ok(user);}

//     @PostMapping("/your-books")
//     public ResponseEntity<User> signup(@Valid @RequestBody User user) {
//         System.out.println("Received username: " + user.getUsername());
//         authService.signup(user);
//         return ResponseEntity.ok(user);}
// }
