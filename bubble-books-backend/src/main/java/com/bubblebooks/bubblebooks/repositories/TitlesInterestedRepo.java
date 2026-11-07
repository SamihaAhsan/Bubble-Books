package com.bubblebooks.bubblebooks.repositories;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bubblebooks.bubblebooks.models.TitlesInterested;

public interface TitlesInterestedRepo extends JpaRepository<TitlesInterested, UUID> {
    
}
