package com.bubblebooks.bubblebooks.services;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bubblebooks.bubblebooks.dto.Bookdto;
import com.bubblebooks.bubblebooks.mappers.BookMap;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.models.Genre;
import com.bubblebooks.bubblebooks.models.GenretoBook;
import com.bubblebooks.bubblebooks.models.AllBooks;
import com.bubblebooks.bubblebooks.repositories.BookRepo;
import java.util.UUID;

@Service
public class BooksService {

    final private BookRepo bookRepo;

    public BooksService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    

    public AllBooks allBooks() {

    List<Bookdto> books = bookRepo.findAll();

     UUID[] bookIds = new UUID[books.size()];
    String[] titles = new String[books.size()];
    String[] firstNames = new String[books.size()];
    String[] lastNames = new String[books.size()];
    
    for (int i = 0; i < books.size(); i++) {
        Bookdto book = books.get(i);
        bookIds[i] = book.getBook_id();
        titles[i] = book.getBook_name();
        firstNames[i] = book.getAuthor_first_name();
        lastNames[i] = book.getAuthor_last_name();
    }

    return new AllBooks(bookIds, titles, firstNames, lastNames);
    
}
}
