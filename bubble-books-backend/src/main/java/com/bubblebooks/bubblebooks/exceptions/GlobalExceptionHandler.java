package com.bubblebooks.bubblebooks.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;


@RestControllerAdvice 

public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> argumentNotValid(
            MethodArgumentNotValidException e) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(" Validation error: " + e.getBindingResult().getFieldError().getDefaultMessage());
    }
}
