package com.api.controller.event;

import com.api.service.auth.UserAuthService;
import com.api.service.event.EventService;
import com.api.service.event.EventUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/event/{eventId}")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventUserController {


    public final EventUserService eventUserService;
    public final UserAuthService userAuthService;
    public final EventService eventService;

    @PostMapping("/addUser")
    public ResponseEntity<String> createUser(@PathVariable Long eventId,
                                             @RequestBody Data data,
                                             Principal principal) {
        ResponseEntity<String> build = getStringResponseEntity(eventId, principal);
        if (build != null) return build;

        eventUserService.addUserToEvent(
                data.email(), eventId
        );
        return ResponseEntity.ok("Added!!");
    }

    private ResponseEntity<String> getStringResponseEntity(Long eventId, Principal principal) {
        if (!eventService.isOwner(principal, eventId)) {
            return ResponseEntity.status(401).build();
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> readSuggestUsers(
            @PathVariable Long eventId,
            Principal principal) {
        ResponseEntity<String> build = getStringResponseEntity(eventId, principal);
        if (build != null) return build;

        return ResponseEntity.ok(eventUserService.getSuggestUsers(eventId));
    }

    private record Data(String email) {
    }

}
