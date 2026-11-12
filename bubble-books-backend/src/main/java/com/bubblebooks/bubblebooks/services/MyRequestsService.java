package com.bubblebooks.bubblebooks.services;
import com.bubblebooks.bubblebooks.models.MyRequest;
import com.bubblebooks.bubblebooks.repositories.Requests;
import org.springframework.stereotype.Service;


@Service 
public class MyRequestsService {

    private final Requests requestsRepository;

    public MyRequestsService(Requests requestsRepository) {
        this.requestsRepository = requestsRepository;
       
    }

    public void saveNewRequest(MyRequest requests) {
        
        requestsRepository.save(requests);
    }
    
}
