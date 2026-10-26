package com.bubblebooks.bubblebooks.dto;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="interested_genres")

public class Genresdto {


    @Column(name = "")
    public String[] genres;

    private UUID book_id;

    public Genresdto(){
    }

    public Genresdto(String[] genres, UUID book_id){
        this.genres=genres;
        this.book_id=book_id;
    }

    public String[] getGenres(){
        return genres;
    }

    public void setGenres(String[] genres){
        this.genres=genres;
    }

    public UUID getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID book_id) {
        this.book_id = book_id;
    }

    
}
