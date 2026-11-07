package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.services.AuthService;
import com.bubblebooks.bubblebooks.services.MyBooksService;
import jakarta.validation.Valid;
import com.bubblebooks.bubblebooks.models.AllBooks;
import com.bubblebooks.bubblebooks.services.BooksService;
import java.util.UUID;

@RestController
public class MyBookRoute {
    
    private final MyBooksService bookService;
    private final BooksService allBooksService;

    public MyBookRoute(MyBooksService bookService, BooksService allBooksService) {
        this.bookService = bookService;
        this.allBooksService = allBooksService;
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

@GetMapping("/all-books")
    public ResponseEntity<AllBooks> allbooks() {
        return ResponseEntity.ok(allBooksService.allBooks());}
     



@PostMapping("/interested-titles")
    public void myInterestedTitles(@Valid @RequestBody UUID book_id, Authentication authentication) {
        bookService.saveMyInterestedTitles(book_id, authentication);
    }

}
