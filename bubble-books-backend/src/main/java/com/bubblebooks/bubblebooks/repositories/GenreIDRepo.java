package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GenreIDRepo
        extends JpaRepository<Genre, UUID> {

        Genre findByGenre(String genre);
                
}
