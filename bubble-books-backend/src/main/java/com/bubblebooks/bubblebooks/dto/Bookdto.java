package com.bubblebooks.bubblebooks.dto;

import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;

@Entity(name = "books")
public class Bookdto {

    @Id
    @GeneratedValue
    @UuidGenerator

    private UUID book_id;

    private String book_name;

    private String author_first_name;

     private String author_last_name;
     private String summary;
    


 public Bookdto() {

}

 public Bookdto(String book_name, String author_first_name, String author_last_name, String summary) {
     this.book_name = book_name;
     this.author_first_name = author_first_name;
     this.author_last_name = author_last_name;
     this.summary = summary;
     this.book_id = java.util.UUID.randomUUID();
 }

 public Bookdto(String book_name, String author_first_name, String author_last_name, String summary, UUID book_id) {
     this.book_name = book_name;
     this.author_first_name = author_first_name;
     this.author_last_name = author_last_name;
     this.summary = summary;
     this.book_id = book_id;
 }

 
    public UUID getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID book_id) {
        this.book_id = book_id;
    }

    public String getBook_name() {
        return book_name;
    }

    public void setBook_name(String book_name) {
        this.book_name = book_name;
    }

    public String getAuthor_first_name() {
        return author_first_name;
    }

    public void setAuthor_first_name(String author_first_name) {
        this.author_first_name = author_first_name;
    }

    public String getAuthor_last_name() {
        return author_last_name;
    }

    public void setAuthor_last_name(String author_last_name) {
        this.author_last_name = author_last_name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    
}
