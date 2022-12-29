package com.api.controller;

import com.api.exception.EventNotFoundException;
import com.api.exception.UserExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> sameEventException() {
        return ResponseEntity.internalServerError().body(Map.of("errorMessage", "You can't add same event!!"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> jsonParseExceptionHandler(Exception ex) {
        return ResponseEntity.internalServerError().body(Map.of("errorMessage", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> globalExceptionHandler(Exception ex) {
        return ResponseEntity.internalServerError().body(Map.of("errorMessage", ex.toString()));
    }

    @ExceptionHandler({UserExistsException.class})
    public ResponseEntity<String> userExistsExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body("User already exists!!");
    }

    @ExceptionHandler({EventNotFoundException.class})
    public ResponseEntity<String> eventNotExistsExceptionHandler(Exception ex) {
        return ResponseEntity.status(404).body("Event not found!!");
    }

}
