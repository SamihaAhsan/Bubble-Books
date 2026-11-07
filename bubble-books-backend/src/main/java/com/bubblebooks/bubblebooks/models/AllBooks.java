package com.bubblebooks.bubblebooks.models;

import jakarta.persistence.Id;
import java.util.UUID;

public class AllBooks {

    private UUID [] book_id; 
    
    private String [] allBookTitles;

    private String [] allBookAuthorFirstNames;

    private String [] allBookAuthorLastNames;


    public AllBooks(UUID[] book_id, String[] allBookTitles, String[] allBookAuthorFirstNames, String[] allBookAuthorLastNames) {
        this.book_id = book_id;
        this.allBookTitles = allBookTitles;
        this.allBookAuthorFirstNames = allBookAuthorFirstNames;
        this.allBookAuthorLastNames = allBookAuthorLastNames;
    }

    public UUID[] getBook_id() {
        return book_id;
    }

    public void setBook_id(UUID[] book_id) {
        this.book_id = book_id;
    }

    public String[] getAllBookAuthorFirstNames() {
        return allBookAuthorFirstNames;
    }

    public void setAllBookAuthorFirstNames(String[] allBookAuthorFirstNames) {
        this.allBookAuthorFirstNames = allBookAuthorFirstNames;
    }

    public String[] getAllBookAuthorLastNames() {
        return allBookAuthorLastNames;
    }

    public void setAllBookAuthorLastNames(String[] allBookAuthorLastNames) {
        this.allBookAuthorLastNames = allBookAuthorLastNames;
    }


    public String[] getAllBookTitles() {
        return allBookTitles;
    }

    public void setAllBookTitles(String[] allBookTitles) {
        this.allBookTitles = allBookTitles;
    }
}
