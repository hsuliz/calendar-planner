package com.api.service.event;

import com.api.entity.User;
import com.api.exception.UserExistsException;
import com.api.exception.UserNotFoundException;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
@AllArgsConstructor
public class EventUserService {

    public final UserRepository userRepository;

    public final EventRepository eventRepository;

    public final EventService eventService;

    public void addUserToEvent(String userEmail, Long eventId) {
        var event = eventService.getEvent(eventId);
        var user = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);

        if (event.getUserSet().contains(user)) {
            throw new UserExistsException();
        }

        event.getUserSet().add(user);
        eventRepository.save(event);
    }

    // TODO NEED TO TEST BUT PROBABLY WORKING
    public Set<User> getSuggestUsers(Long eventId) {
        var currentEvent = eventService.getEvent(eventId);
        var users = userRepository.findAll();
        users.remove(currentEvent.getOwner());
        Set<User> endSet = new HashSet<>();

        users.forEach(user -> {
            if (user.getEventSet().isEmpty()) {
                endSet.add(user);
            } else {
                user.getEventSet().forEach(event -> {
                    if (!event.getId().equals(eventId)) {
                        endSet.add(user);
                    }
                });
            }
        });

        return endSet;
    }

}
