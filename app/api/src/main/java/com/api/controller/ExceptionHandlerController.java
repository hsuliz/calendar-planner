package com.api.controller;

import com.api.exception.EventNotFoundException;
import com.api.exception.SameEventException;
import com.api.exception.UserExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(SameEventException.class)
    public ResponseEntity<ErrorMessage> sameEventException(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(400).body(new ErrorMessage("You can't add same event!!"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorMessage> jsonParseExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.internalServerError().body(new ErrorMessage(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> globalExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.internalServerError().body(new ErrorMessage(ex.toString()));
    }

    @ExceptionHandler({UserExistsException.class})
    public ResponseEntity<ErrorMessage> userExistsExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(400).body(new ErrorMessage("User already exists!"));
    }

    @ExceptionHandler({EventNotFoundException.class})
    public ResponseEntity<ErrorMessage> eventNotExistsExceptionHandler(Exception ex) {
        log.info(ex.toString());
        return ResponseEntity.status(404).body(new ErrorMessage("Event not found!"));
    }

    private record ErrorMessage(String errorMessage) {
    }

}
