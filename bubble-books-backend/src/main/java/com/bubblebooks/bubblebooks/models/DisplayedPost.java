package com.bubblebooks.bubblebooks.models;
import java.util.UUID;

public class DisplayedPost extends MyPosting {

    private String bookTitle;
    private String authorFirstName;
    private String authorLastName;
    private String bookSummary;
    private String[] bookGenres;
   

    public DisplayedPost(UUID book_posting_id, UUID book_id, UUID account_posted_id, String status, String bookTitle, String authorFirstName, String authorLastName, String bookSummary, String[] bookGenres) {
        super(book_posting_id, book_id, account_posted_id, status);
        this.bookTitle = bookTitle;
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
        this.bookSummary = bookSummary;
        this.bookGenres = bookGenres;
    
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthorFirstName() {
        return authorFirstName;
    }

    public void setAuthorFirstName(String authorFirstName) {
        this.authorFirstName = authorFirstName;
    }

    public String getAuthorLastName() {
        return authorLastName;
    }

    public void setAuthorLastName(String authorLastName) {
        this.authorLastName = authorLastName;
    }

    public String getBookSummary() {
        return bookSummary;
    }

    public void setBookSummary(String bookSummary) {
        this.bookSummary = bookSummary;
    }

    public String[] getBookGenres() {
        return bookGenres;
    }

    public void setBookGenres(String[] bookGenres) {
        this.bookGenres = bookGenres;
    }
    

}
