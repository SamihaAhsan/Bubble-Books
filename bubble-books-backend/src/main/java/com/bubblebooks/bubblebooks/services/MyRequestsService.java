package com.bubblebooks.bubblebooks.services;
import java.util.List;

import jakarta.persistence.EntityNotFoundException;
import com.bubblebooks.bubblebooks.models.MyRequest;
import com.bubblebooks.bubblebooks.dto.Bookdto;
import com.bubblebooks.bubblebooks.dto.MyRequestResponse;
import com.bubblebooks.bubblebooks.repositories.BookRepo;
import com.bubblebooks.bubblebooks.repositories.Requests;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.UUID;


@Service 
public class MyRequestsService {

    private final Requests requestsRepository;
    private final BookRepo bookRepo;
    private final UserService userService;

    public MyRequestsService(Requests requestsRepository, BookRepo bookRepo, UserService userService) {
        this.requestsRepository = requestsRepository;
        this.bookRepo = bookRepo;
        this.userService = userService;
    }

    public void saveNewRequest(MyRequest requests) {
        
        requestsRepository.save(requests);
    }

    public List<MyRequestResponse> getMyRequests(Authentication authentication) {
        UUID currentUserId = userService.accessUserIDString(authentication);
        return requestsRepository.findForUser(currentUserId).stream()
                .map(request -> {
                    if (request.getBook_requested() == null) {
                        throw new IllegalStateException(
                                "Request " + request.getRequest_id() + " has no requested book ID");
                    }

                    Bookdto book = bookRepo.findById(request.getBook_requested())
                            .orElseThrow(() -> new EntityNotFoundException(
                                    "Book " + request.getBook_requested() + " for request "
                                            + request.getRequest_id() + " was not found"));
                    return new MyRequestResponse(request, book, currentUserId);
                })
                .toList();
    }
    
}
