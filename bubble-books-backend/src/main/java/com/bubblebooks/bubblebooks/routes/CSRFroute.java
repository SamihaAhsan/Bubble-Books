package com.bubblebooks.bubblebooks.routes;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CSRFroute {

    @GetMapping("/csrf")
    public CsrfToken getCsrfToken(CsrfToken token) {
        return token;
    }
}