package com.bubblebooks.bubblebooks.models;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name="interested_titles")
public class TitlesInterested {

    

    private UUID accounts_interested;

    @Id
    private UUID book_id;

    public TitlesInterested() {

    }

    public TitlesInterested(UUID account_interested, UUID book_id) {
        this.accounts_interested = account_interested;
        this.book_id = book_id;
    }

    public UUID getAccount_interested() {
        return accounts_interested;
    }

    public void setAccount_interested(UUID account_interested) {
        this.accounts_interested = account_interested;
    }

    public UUID getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID book_id) {
        this.book_id = book_id;
    }


}