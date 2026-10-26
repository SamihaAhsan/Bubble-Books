package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.services.AuthService;
import com.bubblebooks.bubblebooks.services.MyBooksService;
import jakarta.validation.Valid;

@RestController
public class MyBookRoute {
    
    private final MyBooksService bookService;

    public MyBookRoute(MyBooksService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/my-genres")
    public ResponseEntity<Genresdto> saveMyGenres(@Valid @RequestBody String[] genres) {
        bookService.saveMyGenres(genres);
        return ResponseEntity.ok(new Genresdto(genres, null));}
    
    
        /*  @PostMapping("/my-books")
    public ResponseEntity<User> signup(@Valid @RequestBody User user) {
        System.out.println("Received username: " + user.getUsername());
        bookService.signup(user);
        return ResponseEntity.ok(user);}*/
     

       

}
