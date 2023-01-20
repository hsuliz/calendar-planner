package com.api.controller.event;

import com.api.entity.Event;
import com.api.service.auth.UserAuthService;
import com.api.service.event.EventService;
import com.api.service.event.EventUserService;
import com.api.util.ReturnMessage;
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

    public EventUserService eventUserService;

    public UserAuthService userAuthService;


    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        eventService.saveEvent(event, userAuthService.auth(principal));
        return ResponseEntity.ok(Map.of("message", "Event added."));
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
            return ResponseEntity.status(404).body(
                    Map.of("errorMessage", "Only owner can view this.")
            );
        }

        return ResponseEntity.ok(Map.of(
                "name", event.getName(),
                "description", event.getDescription(),
                "dateFrom", event.getDateFrom(),
                "dateTo", event.getDateTo(),
                "isPublic", event.getIsPublic(),
                "periodicity", event.getPeriodicity(),
                // TODO: add until field
                // "until", event.getUntil(),

                "isOwner", isOwner,
                "inviteCode", event.getInviteCode(),
                "owner", event.getOwner(),
                "list", event.getUserSet()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReturnMessage> deleteEvent(Principal principal, @PathVariable Long id) {
        var event = eventService.getEvent(id);
        var user = userAuthService.auth(principal);
        var isOwner = event.getOwner().getEmail().equals(principal.getName());
        var isContains = event.getUserSet().contains(user);

        eventService.deleteEvent(id);

        if (!isContains && !isOwner) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(new ReturnMessage("Event deleted."));
    }

    @PostMapping("/enroll")
    public ResponseEntity<ReturnMessage> enroll(@RequestBody InviteCode inviteCode, Principal principal) {
        var user = userAuthService.auth(principal);
        System.out.println(inviteCode);
        eventUserService.addUserToEventByCode(inviteCode.inviteCode, user);
        return ResponseEntity.ok(new ReturnMessage("Enrolled."));
    }

    private record InviteCode(String inviteCode) {
    }


}
