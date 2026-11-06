package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.dto.Bookdto;
import com.bubblebooks.bubblebooks.mappers.BookMap;
import com.bubblebooks.bubblebooks.repositories.BookRepo;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.bubblebooks.bubblebooks.repositories.GenreInterestedRepo;
import com.bubblebooks.bubblebooks.repositories.GenreIDRepo;
import java.util.UUID;
import com.bubblebooks.bubblebooks.models.Genre;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.repositories.MyPostingRepos;
import com.bubblebooks.bubblebooks.models.MyPosting;

@Service
public class MyBooksService {
    
    private final BookRepo bookRepo;
    private final MyPostingRepos myPostingRepos;
    GenreInterestedRepo genreRepo;  
    GenreIDRepo genreIDRepo;
    UserService userService;

    MyBooksService(GenreInterestedRepo genreRepo, GenreIDRepo genreIDRepo, UserService userService, BookRepo bookRepo, MyPostingRepos myPostingRepos) {
        this.genreRepo = genreRepo;
        this.genreIDRepo = genreIDRepo;
        this.userService = userService;
        this.bookRepo = bookRepo;
        this.myPostingRepos = myPostingRepos;
    }
    public void saveMyGenres(String[] genres, Authentication authentication) {
    UUID authen = userService.accessUserIDString(authentication);
    for (String genre : genres) {
        System.out.println("Genre: " + genre);
        Genre genre_info = genreIDRepo.findByGenre(genre);
        Genresdto genresdto = new Genresdto(genre_info.getGenre_id(), authen);
        genreRepo.save(genresdto);
    }}

    public void saveMyBooks(Book book, Authentication authentication) {
    UUID authen = userService.accessUserIDString(authentication);
    Bookdto bookdto = BookMap.toBookdto(book);
    bookRepo.save(bookdto);
    MyPosting myPosting = new MyPosting(book.getBook_id(), authen, "available");
    myPostingRepos.save(myPosting);

}
    }

