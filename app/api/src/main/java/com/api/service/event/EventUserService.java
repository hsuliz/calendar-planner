package com.api.service.event;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.exception.AlreadyEnrolledException;
import com.api.exception.EventNotFoundException;
import com.api.exception.UserExistsException;
import com.api.exception.UserNotFoundException;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import com.api.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@AllArgsConstructor
public class EventUserService {

    public final UserRepository userRepository;

    public final EventRepository eventRepository;

    public final EventService eventService;

    public final UserService userService;


    private static void isUserContainsInEvent(Event event, User user) {
        if (event.getUserSet().contains(user)) {
            throw new UserExistsException();
        }
    }

    private static void findUsersForSuggest(Long eventId, List<User> users, Set<User> endSet) {
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
    }

    public void addUserToEvent(String userEmail, Long eventId) {
        var event = eventService.getEvent(eventId);
        var user = userRepository
                .findByEmail(userEmail)
                .orElseThrow(UserNotFoundException::new);
        isUserContainsInEvent(event, user);
        event.getUserSet().add(user);
        eventRepository.save(event);
    }

    public void addUserToEventByCode(String inviteCode, User user) {
        var event = eventRepository
                .findEventByInviteCode(inviteCode)
                .orElseThrow(EventNotFoundException::new);
        if (event.getUserSet().contains(user)) {
            throw new AlreadyEnrolledException();
        }
        event.getUserSet().add(user);
        eventRepository.save(event);
    }

    public Set<User> getSuggestUsers(Long eventId) {
        var currentEvent = eventService.getEvent(eventId);
        var users = userRepository.findAll();
        users.remove(currentEvent.getOwner());
        Set<User> endSet = new HashSet<>();
        findUsersForSuggest(eventId, users, endSet);
        return endSet;
    }

    @Transactional
    public void deleteUserFromEvent(String email, Event event) {
        var user = userService.getUser(email);
        user.getEventSet().remove(event);
        event.getUserSet().remove(user);
        // wtf
        userRepository.delete(user);
        userRepository.flush();
        userRepository.saveAndFlush(user);
    }

}
