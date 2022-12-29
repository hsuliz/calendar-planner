package com.api.service.event;

import com.api.exception.EventNotFoundException;
import com.api.exception.UserExistsException;
import com.api.exception.UserNotFoundException;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EventUserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public void addUserToEvent(String userEmail, Long eventId) {
        var event = eventRepository.findById(eventId).orElseThrow(EventNotFoundException::new);
        var user = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);

        if (event.getUserSet().contains(user)) {
            throw new UserExistsException();
        }

        event.getUserSet().add(user);
        eventRepository.save(event);
    }

}
