package com.bubblebooks.bubblebooks.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity
public class Genre {

    @Id
    private UUID genre_id;

    private String genre;

    public Genre() {
    }

    public Genre(UUID genre_id, String genre) {
        this.genre_id = genre_id;
        this.genre = genre;
    }

    public UUID getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(UUID genre_id) {
        this.genre_id = genre_id;
    }

    
    

}
