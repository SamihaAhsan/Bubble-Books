package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.services.AuthService;
import com.bubblebooks.bubblebooks.services.MyBooksService;
import jakarta.validation.Valid;

@RestController
public class MyBookRoute {
    
    private final MyBooksService bookService;

    public MyBookRoute(MyBooksService bookService) {
        this.bookService = bookService;
    }

    @PostMapping({"/my-genres"})
    public ResponseEntity<String[]> saveMyGenres(@Valid @RequestBody String[] genres, Authentication authentication) {
        bookService.saveMyGenres(genres, authentication);
        return ResponseEntity.ok(genres);}
    
    
  @PostMapping("/my-books")
    public ResponseEntity<Book> signup(@Valid @RequestBody Book[] books, Authentication authentication) {
        for (Book book : books) {
            bookService.saveMyBooks(book, authentication);
        }
        return ResponseEntity.ok(books[0]);}
     

       

}
