package com.api.service;

import com.api.entity.User;
import com.api.model.LoginRequest;
import com.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserAuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenService tokenService;

    private final AuthenticationManager authenticationManager;


    public String registerUser(User user) {
        userRepository
                .findByEmail(user.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("User with email already exist!!");
                });

        var nonEncodedPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(nonEncodedPassword));
        userRepository.save(user);

        return authenticateUser(new LoginRequest(user.getEmail(), nonEncodedPassword));
    }

    public String authenticateUser(LoginRequest clientLogin) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        clientLogin.email(),
                        clientLogin.password()));

        return tokenService.generateToken(authentication);
    }

}
