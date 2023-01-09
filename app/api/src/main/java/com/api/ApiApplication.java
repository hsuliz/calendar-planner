package com.api;

import com.api.entity.User;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
@Transactional
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    public ApplicationRunner applicationStartupRunner(
            EventRepository eventRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            var user = new User(
                "Michał", 
                "Rojek",
                "test@test.com", 
                passwordEncoder.encode("testtest")
            );
            userRepository.save(user);
        };
    }

}