package com.bubblebooks.bubblebooks.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity(name="book_genre")
public class GenretoBook {
    
    @Id
    private UUID book_id;
    
    private UUID genre_id;
    
    public GenretoBook(){
    }

    public GenretoBook(UUID book_id, UUID genre_id){
        this.book_id = book_id;
        this.genre_id = genre_id;
    }

    public UUID getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID book_id) {
        this.book_id = book_id;
    }

    public UUID getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(UUID genre_id) {
        this.genre_id = genre_id;
    }


}
