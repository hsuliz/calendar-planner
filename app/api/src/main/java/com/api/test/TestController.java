package com.api.test;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TestController {

    @GetMapping
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok().body("Get test passed!!");
    }

    @PostMapping
    public ResponseEntity<String> postTest() {
        return ResponseEntity.ok().body("Post test passed!!");
    }

}
