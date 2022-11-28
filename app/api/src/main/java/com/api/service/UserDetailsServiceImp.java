package com.api.service;

import com.api.model.UserDetailsImp;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImp implements org.springframework.security.core.userdetails.UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .map(UserDetailsImp::new)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with -> username or email: " + username));
    }

}
