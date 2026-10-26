package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GenreInterestedRepo
        extends JpaRepository<Genresdto, UUID> {

                
}
