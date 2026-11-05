package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.dto.Genresdto;
import com.bubblebooks.bubblebooks.dto.GenresdtoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepo
        extends JpaRepository<Genresdto, GenresdtoId> {

                
}
