package com.bubblebooks.bubblebooks.models;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.UUID;


@Entity(name="book_postings")
public class MyPosting {
    
    @Id
    @GeneratedValue
    @UuidGenerator

    private UUID book_posting_id;

    UUID book_id;

    UUID account_posted_id;

    String status;

    public MyPosting() {

}

 public MyPosting(UUID book_id, UUID account_posted_id, String status) {
     this.book_id = book_id;
     this.account_posted_id = account_posted_id;
     this.status = status;
 }
 

 public MyPosting(UUID book_posting_id, UUID book_id, UUID account_posted_id, String status) {
     this.book_posting_id = book_posting_id;
     this.book_id = book_id;
     this.account_posted_id = account_posted_id;
     this.status = status;
 }

    public UUID getBook_posting_id() {
        return book_posting_id;
    }

    public void setBook_posting_id(UUID book_posting_id) {
        this.book_posting_id = book_posting_id;
    }

    public UUID getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID book_id) {
        this.book_id = book_id;
    }

    public UUID getAccount_posted_id() {
        return account_posted_id;
    }

    public void setAccount_posted_id(UUID account_posted_id) {
        this.account_posted_id = account_posted_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
 }

    

