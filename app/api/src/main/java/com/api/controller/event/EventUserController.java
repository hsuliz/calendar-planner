package com.api.controller.event;

import com.api.entity.Event;
import com.api.service.EventForUserService;
import com.api.service.UserAuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/event")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventUserController {

    public EventForUserService eventForUserService;

    public UserAuthService userAuthService;


    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        eventForUserService.saveEvent(event, userAuthService.auth(principal));
        return ResponseEntity.ok(Map.of("message", "Event added!!"));
    }

    @GetMapping
    public Map<String, Set<Event>> readAllEvents(Principal principal) {
        return Map.of("events", eventForUserService.getEvents(userAuthService.auth(principal)));
    }

}
