package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.GenretoBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;
import java.util.List;

public interface GenreBookRepo extends
 JpaRepository<GenretoBook, UUID> {
    
    @Query("SELECT g FROM book_genre g WHERE g.book_id = :bookId")
List<GenretoBook> findByBookId(@Param("bookId") UUID bookId);

}
