package com.api.controller.event;

import com.api.entity.Event;
import com.api.service.auth.UserAuthService;
import com.api.service.event.EventService;
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
public class EventController {

    public EventService eventService;

    public UserAuthService userAuthService;


    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        eventService.saveEvent(event, userAuthService.auth(principal));
        return ResponseEntity.ok(Map.of("message", "Event added!!"));
    }

    @GetMapping
    public Map<String, Set<Event>> readAllEvents(Principal principal) {
        return Map.of("events", eventService.getEvents(userAuthService.auth(principal)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, ?>> readEvent(Principal principal, @PathVariable Long id) {
        var event = eventService.getEvent(id);
        var user = userAuthService.auth(principal);
        var isOwner = event.getOwner().getEmail().equals(principal.getName());
        var isContains = event.getUserSet().contains(user);

        if (!isContains && !isOwner) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.ok(Map.of(
                "public", event.getIsPublic(),
                "isOwner", isOwner,
                "inviteCode", event.hashCode(),
                "owner", event.getOwner(),
                "list", event.getUserSet()
        ));
    }

}
