package com.bubblebooks.bubblebooks.repositories;
import com.bubblebooks.bubblebooks.models.MyRequest;
import java.util.UUID;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Requests
        extends JpaRepository<MyRequest, UUID> {

    @Query("SELECT r FROM requests r WHERE r.sent_id = :userId OR r.received_id = :userId")
    List<MyRequest> findForUser(@Param("userId") UUID userId);
}
