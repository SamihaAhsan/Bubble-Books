package com.bubblebooks.bubblebooks.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bubblebooks.bubblebooks.models.MyRequest;
import org.springframework.security.core.Authentication;
import com.bubblebooks.bubblebooks.services.MyRequestsService;

import jakarta.validation.Valid;

@RestController 
public class MyTradesRoute {

    private final MyRequestsService requestService;
    

    public MyTradesRoute(MyRequestsService requestService) {
        this.requestService = requestService;
      
    }

    @PostMapping({"/new-request"})
    public ResponseEntity<String[]> saveNewRequest(@Valid @RequestBody MyRequest requests) {
        requestService.saveNewRequest(requests);
        return ResponseEntity.ok(new String[] { "Request saved successfully" });
    }

}
