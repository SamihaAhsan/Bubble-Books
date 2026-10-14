package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface AccountRepo
        extends JpaRepository<User, UUID> {

                boolean existsByUsername(String username);

                boolean existsByEmail(String email);
}
