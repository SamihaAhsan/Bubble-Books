package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.bubblebooks.bubblebooks.dto.Bookdto;

public interface BookRepo
        extends JpaRepository<Bookdto, UUID> {  
                
                
}