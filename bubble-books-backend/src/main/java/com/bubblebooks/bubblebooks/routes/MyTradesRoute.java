package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bubblebooks.bubblebooks.dto.MyRequestResponse;
import com.bubblebooks.bubblebooks.models.MyRequest;
import org.springframework.security.core.Authentication;
import com.bubblebooks.bubblebooks.services.MyRequestsService;

import jakarta.validation.Valid;
import java.util.List;

@RestController 
public class MyTradesRoute {

    private final MyRequestsService requestService;
    

    public MyTradesRoute(MyRequestsService requestService) {
        this.requestService = requestService;
      
    }

    @PostMapping({"/new-request"})
    public ResponseEntity<MyRequest> saveNewRequest(@Valid @RequestBody MyRequest requests) {
        requestService.saveNewRequest(requests);
        return ResponseEntity.ok(requests);
    }

    @GetMapping({"/myrequests"})
    public ResponseEntity<List<MyRequestResponse>> getMyRequests(Authentication authentication) {

        return ResponseEntity.ok(requestService.getMyRequests(authentication));
    }

}
