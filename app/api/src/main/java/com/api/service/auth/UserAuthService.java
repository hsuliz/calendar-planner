package com.api.service.auth;

import com.api.entity.User;
import com.api.exception.UserExistsException;
import com.api.model.LoginRequest;
import com.api.repository.UserRepository;
import com.api.service.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class UserAuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenService tokenService;

    private final AuthenticationManager authenticationManager;


    private static void accept(User u) {
        throw new UserExistsException();
    }

    public String registerUser(User user) {
        userRepository
                .findByEmail(user.getEmail())
                .ifPresent(UserAuthService::accept);

        var nonEncodedPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(nonEncodedPassword));
        userRepository.save(user);

        return generateToken(new LoginRequest(user.getEmail(), nonEncodedPassword));
    }

    public String generateToken(LoginRequest clientLogin) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        clientLogin.email(),
                        clientLogin.password()));

        return tokenService.generateToken(authentication);
    }

    public User auth(Principal principal) {
        return userRepository.findByEmail(principal.getName()).orElseThrow();
    }

}
