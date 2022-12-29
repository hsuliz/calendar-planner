package com.api.service.event;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.exception.EventNotFoundException;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import com.api.service.auth.UserAuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Objects;
import java.util.Set;

@Service
@AllArgsConstructor
public class EventService {

    public UserAuthService userAuthService;

    public UserRepository userRepository;

    public EventRepository eventRepository;


    public void saveEvent(Event event, User currentUser) {
        var existingEvent = eventRepository.findEventByOwnerAndDateFromAndDateTo(currentUser, event.getDateFrom(), event.getDateTo()).orElse(null);
        if (existingEvent == null && isValid(event)) {
            event.setOwner(currentUser);
            eventRepository.save(event);
        } else {
            throw new IllegalStateException();
        }
    }

    public boolean isOwner(Principal principal, Long eventId) {
        var event = getEvent(eventId);
        var user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return Objects.equals(event.getOwner().getId(), user.getId());
    }

    private boolean isValid(Event event) {
        return event.getDateFrom().isBefore(event.getDateTo());
    }

    public Set<Event> getEvents(User user) {
        return eventRepository.findEventsByOwner(user).orElseThrow();
    }

    public Event getEvent(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(EventNotFoundException::new);
    }

}
