package com.api.service;

import com.api.entity.User;
import com.api.exception.UserNotFoundException;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    final private UserRepository userRepository;


    public User getUser(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    public User getUser(Long id) {
        return userRepository
                .findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

}
