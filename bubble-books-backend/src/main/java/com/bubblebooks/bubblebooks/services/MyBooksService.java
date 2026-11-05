package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.bubblebooks.bubblebooks.repositories.GenreInterestedRepo;
import com.bubblebooks.bubblebooks.repositories.GenreIDRepo;
import java.util.UUID;
import com.bubblebooks.bubblebooks.models.Genre;
import com.bubblebooks.bubblebooks.models.Book;

@Service
public class MyBooksService {
    
    GenreInterestedRepo genreRepo;  
    GenreIDRepo genreIDRepo;
    UserService userService;

    MyBooksService(GenreInterestedRepo genreRepo, GenreIDRepo genreIDRepo, UserService userService) {
        this.genreRepo = genreRepo;
        this.genreIDRepo = genreIDRepo;
        this.userService = userService;
    }
    public void saveMyGenres(String[] genres, Authentication authentication) {
    UUID authen = userService.accessUserIDString(authentication);
    for (String genre : genres) {
        System.out.println("Genre: " + genre);
        Genre genre_info = genreIDRepo.findByGenre(genre);
        Genresdto genresdto = new Genresdto(genre_info.getGenre_id(), authen);
        genreRepo.save(genresdto);
    }

     public void saveMyBooks(Book book, Authentication authentication) {
    UUID authen = userService.accessUserIDString(authentication);
        Genresdto genresdto = new Genresdto(genre_info.getGenre_id(), authen);
        genreRepo.save(genresdto);
    
}
    }

