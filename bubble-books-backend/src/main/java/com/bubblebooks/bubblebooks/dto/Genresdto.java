package com.bubblebooks.bubblebooks.dto;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@IdClass(GenresdtoId.class)
@Table(name="interested_genres")
public class Genresdto {

    @Id
    @Column(name = "genre_id")
    public UUID genre_id;

    @Id
    @Column(name = "account_interested")
    private UUID account_id;

    public Genresdto(){
    }

    public Genresdto( UUID genre_id, UUID account_id){
        this.genre_id=genre_id;
        this.account_id=account_id;
    }

    public UUID getGenres(){
        return genre_id;
    }

    public void setGenres(UUID genre_id){
        this.genre_id=genre_id;
    }

    public UUID getAccount_id() {
        return account_id;
    }

    public void setAccount_id(UUID account_id) {
        this.account_id = account_id;
    }

    
}
