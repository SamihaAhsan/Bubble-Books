package com.bubblebooks.bubblebooks.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bubblebooks.bubblebooks.models.User;
import java.util.UUID;

public interface AccountRepo extends JpaRepository<User, UUID> {
    
    
}
