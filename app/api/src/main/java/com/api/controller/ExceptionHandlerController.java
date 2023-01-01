package com.api.controller;

import com.api.exception.EventNotFoundException;
import com.api.exception.SameEventException;
import com.api.exception.UserExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(SameEventException.class)
    public ResponseEntity<Map<String, String>> sameEventException(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(400).body(Map.of("errorMessage", "You can't add same event!!"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> jsonParseExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.internalServerError().body(Map.of("errorMessage", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> globalExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.internalServerError().body(Map.of("errorMessage", ex.toString()));
    }

    @ExceptionHandler({UserExistsException.class})
    public ResponseEntity<String> userExistsExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(400).body("User already exists!!");
    }

    @ExceptionHandler({EventNotFoundException.class})
    public ResponseEntity<String> eventNotExistsExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(404).body("Event not found!!");
    }

}
