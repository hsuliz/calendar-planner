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


    public void addEvent(Event event, User currentUser) {
        event.setUser(currentUser);
        eventRepository.save(event);
    }

    public Set<Event> getEvents(User user) {
        var events = eventRepository.findEventsByUser(user).orElseThrow();
        return events;
    }

}
