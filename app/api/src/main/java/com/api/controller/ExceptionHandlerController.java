package com.api.controller;

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

}
