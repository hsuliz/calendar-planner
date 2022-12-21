package com.api.service;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class EventForUserService {

    public UserAuthService userAuthService;

    public UserRepository userRepository;

    public EventRepository eventRepository;


    public void saveEvent(Event event, User currentUser) {
        var existingEvent = eventRepository.findEventByUserAndDateFromAndDateTo(
                currentUser,
                event.getDateFrom(),
                event.getDateTo()
        ).orElse(null);
        if (existingEvent == null) {
            event.setUser(currentUser);
            eventRepository.save(event);
        } else {
            System.out.println("Exist");
        }
    }

    public Set<Event> getEvents(User user) {
        var events = eventRepository.findEventsByUser(user).orElseThrow();
        return events;
    }

}