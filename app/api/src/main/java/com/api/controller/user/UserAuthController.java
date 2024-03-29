package com.api.controller.user;

import com.api.entity.User;
import com.api.model.LoginRequest;
import com.api.service.auth.UserAuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserAuthController {

    public UserAuthService userAuthService;

    public Map<String, String> outJson;

    @PostMapping("/registration")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody User user) {
        return ResponseEntity.ok(Map.of("token", userAuthService.registerUser(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> createUsersToken(@RequestBody LoginRequest user) {
        outJson = new HashMap<>();
        outJson.put("token", userAuthService.generateToken(user));
        return new ResponseEntity<>(outJson, HttpStatus.OK);
    }

    @GetMapping("/validateToken")
    public void validateUser(Principal principal) {
        userAuthService.auth(principal);
    }

}
