package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.UUID;

public interface AccountRepo
        extends JpaRepository<User, UUID> {

                @Query("select case when count(u) > 0 then true else false end from User u where u.username = :username")
                boolean existsByUsername(@Param("username") String username);

                @Query("select case when count(u) > 0 then true else false end from User u where u.email = :email")
                boolean existsByEmail(@Param("email") String email);

                Optional<User> findByUsername(String username);
}
