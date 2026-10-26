package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.bubblebooks.bubblebooks.repositories.GenreInterestedRepo;

@Service
public class MyBooksService {
    
    GenreInterestedRepo genreRepo;
    MyBooksService(GenreInterestedRepo genreRepo) {
        this.genreRepo = genreRepo;
    }
    public void saveMyGenres(String[] genres) {
        for (String genre : genres) {
            Genresdto genresdto = new Genresdto(new String[]{genre}, null);
            genreRepo.save(genresdto);
        }
    }
}
