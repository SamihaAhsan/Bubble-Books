package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.MyRequest;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Requests
        extends JpaRepository<MyRequest, UUID> {

                
}
