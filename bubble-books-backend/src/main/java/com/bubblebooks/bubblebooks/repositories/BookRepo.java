package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface BookRepo
        extends JpaRepository<Book, UUID> {
}