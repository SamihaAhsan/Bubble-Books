package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.GenretoBook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface GenreBookRepo extends
 JpaRepository<GenretoBook, UUID> {
    

}
