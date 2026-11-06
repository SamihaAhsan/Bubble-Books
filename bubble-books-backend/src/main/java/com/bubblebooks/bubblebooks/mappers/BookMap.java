package com.bubblebooks.bubblebooks.mappers;

import java.util.Objects;

import com.bubblebooks.bubblebooks.dto.Bookdto;
import com.bubblebooks.bubblebooks.models.Book;

public class BookMap {

    private BookMap() {
    }

    public static Book toBook(Bookdto bookdto) {
        Objects.requireNonNull(bookdto, "bookdto must not be null");
        return new Book(
                bookdto.getBook_name(),
                bookdto.getAuthor_first_name(),
                bookdto.getAuthor_last_name(),
                bookdto.getSummary(),
                bookdto.getBook_id(),
                null);
    }

    public static Bookdto toBookdto(Book book) {
        Objects.requireNonNull(book, "book must not be null");
        return new Bookdto(
                book.getBook_name(),
                book.getAuthor_first_name(),
                book.getAuthor_last_name(),
                book.getSummary(),
                book.getBook_id());
    }
}
