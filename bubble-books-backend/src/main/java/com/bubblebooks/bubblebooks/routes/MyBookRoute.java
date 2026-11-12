package com.bubblebooks.bubblebooks.routes;

import com.bubblebooks.bubblebooks.repositories.BookRepo;
import com.bubblebooks.bubblebooks.repositories.GenreBookRepo;
import com.bubblebooks.bubblebooks.repositories.GenreRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.bubblebooks.bubblebooks.models.Genre;
import com.bubblebooks.bubblebooks.dto.Bookdto;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.services.AuthService;
import com.bubblebooks.bubblebooks.services.MyBooksService;
import jakarta.validation.Valid;
import com.bubblebooks.bubblebooks.models.AllBooks;
import com.bubblebooks.bubblebooks.services.BooksService;
import com.bubblebooks.bubblebooks.models.MyPosting;
import com.bubblebooks.bubblebooks.models.DisplayedPost;
import java.util.List;
import com.bubblebooks.bubblebooks.repositories.GenreIDRepo;
import com.bubblebooks.bubblebooks.repositories.GenreBookRepo;
import java.util.ArrayList;
import java.util.UUID;
import com.bubblebooks.bubblebooks.models.GenretoBook;
@RestController
public class MyBookRoute {
    
    private final BookRepo bookRepo;
    private final GenreBookRepo genreBookRepo;
    private final MyBooksService bookService;
    private final GenreRepo genreRepo;
    private final BooksService allBooksService;
    private final GenreIDRepo genreIDRepo;
    public MyBookRoute(MyBooksService bookService, BooksService allBooksService, BookRepo bookRepo, GenreBookRepo genreBookRepo , GenreRepo genreRepo, GenreIDRepo genreIDRepo) {
        this.bookService = bookService;
        this.allBooksService = allBooksService;
        this.bookRepo = bookRepo;
        this.genreBookRepo = genreBookRepo;
        this.genreRepo = genreRepo;
        this.genreIDRepo = genreIDRepo;
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

@GetMapping("/recommended-reads")

    public ResponseEntity<DisplayedPost[]> loadReads(Authentication authentication) {

        MyPosting[] myPostings = {
    new MyPosting(
        UUID.fromString("4ab538cb-1d60-4dfc-80ef-ae267ca874b5"),
        UUID.fromString("1c7f2368-3eaf-4b9e-96a7-97d60ca79b74"),
        UUID.fromString("7b7b8723-c5b7-4969-a350-62423356775e"),
        "available"
    ),
    new MyPosting(
        UUID.fromString("5d38c166-5932-4d54-ba49-17a185920836"),
        UUID.fromString("e9cd3706-f539-4328-a070-911404545f94"),
        UUID.fromString("7b7b8723-c5b7-4969-a350-62423356775e"),
        "available"
    ),
    new MyPosting(
        UUID.fromString("c008112d-31d1-472a-955b-627550707903"),
        UUID.fromString("02a61524-7b23-44d2-898b-b7b7b8862473"),
        UUID.fromString("7b7b8723-c5b7-496a-350-62423356775e"),
        "available"
    )
};

        DisplayedPost[] displayedPosts = new DisplayedPost[myPostings.length];

        for (int i = 0; i < myPostings.length; i++) {
            MyPosting myPosting = myPostings[i];
            Bookdto book =  bookRepo.findById(myPosting.getBook_id()).get();
            // 3 genres maximum for each book, so we can create an array of size 3 to hold the genres
            String genre[] = new String[3];
            List<GenretoBook> genreEntries = genreBookRepo.findByBookId(myPosting.getBook_id());

            for (GenretoBook genreEntry : genreEntries) {
                UUID genreId = genreEntry.getGenre_id();
                genre[i] = genreIDRepo.findById(genreId).get().getGenre();
            }
            displayedPosts[i] = new DisplayedPost(
                myPosting.getBook_posting_id(),
                myPosting.getBook_id(),
                myPosting.getAccount_posted_id(),
                myPosting.getStatus(),
                book.getBook_name(),
                book.getAuthor_first_name(),
                book.getAuthor_last_name(),
                book.getSummary(),
                genre
            );
        }



        return ResponseEntity.ok(displayedPosts);}

}
