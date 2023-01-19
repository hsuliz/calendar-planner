package com.api;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import com.api.service.event.EventService;
import com.api.service.event.EventUserService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootApplication
@Transactional
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    public ApplicationRunner applicationStartupRunner(
            EventRepository eventRepository,
            EventService eventService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EventUserService eventUserService
    ) {
        return args -> {

            // TEST
            var listOfUsers = List.of(
                    new User(
                            "Michał",
                            "Rojek",
                            "mr@test.com",
                            passwordEncoder.encode("testtest")
                    ),
                    new User(
                            "Andrzej",
                            "Kojek",
                            "ak@test.com",
                            passwordEncoder.encode("testtest")
                    ),
                    new User(
                            "Roman",
                            "Jolek",
                            "romjal@test.com",
                            passwordEncoder.encode("testtest")
                    )
            );
            userRepository.saveAll(listOfUsers);
        };
    }

}