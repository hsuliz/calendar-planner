package com.api.controller;

import com.api.entity.User;
import com.api.model.LoginRequest;
import com.api.service.UserAuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserAuthController {

    public UserAuthService userAuthService;


    @PostMapping("/registration")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody User user) {
        Map<String, String> outJson = new HashMap<>();
        String token;

        try {
            token = userAuthService.registerUser(user);
            outJson.put("token", token);
        } catch (RuntimeException runtimeException) {
            outJson.put("failureReason", "User already exists!!");
            return new ResponseEntity<>(outJson, HttpStatusCode.valueOf(420));
        }

        return new ResponseEntity<>(outJson, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> createUsersToken(@RequestBody LoginRequest user) {
        Map<String, String> outJson = new HashMap<>();

        outJson.put("token", userAuthService.authenticateUser(user));

        return new ResponseEntity<>(outJson, HttpStatus.OK);
    }

}
