package com.api.service;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import com.api.service.auth.UserAuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class EventUserService {

    public UserAuthService userAuthService;

    public UserRepository userRepository;

    public EventRepository eventRepository;


    public void saveEvent(Event event, User currentUser) {
        var existingEvent = eventRepository.findEventByUserAndDateFromAndDateTo(currentUser, event.getDateFrom(), event.getDateTo()).orElse(null);
        if (existingEvent == null && isValid(event)) {
            event.setUser(currentUser);
            eventRepository.save(event);
        } else {
            throw new IllegalStateException();
        }
    }

    private boolean isValid(Event event) {
        return event.getDateFrom().isBefore(event.getDateTo());
    }

    public Set<Event> getEvents(User user) {
        return eventRepository.findEventsByUser(user).orElseThrow();
    }

}
