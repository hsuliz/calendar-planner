package com.api;

import com.api.entity.Event;
import com.api.entity.User;
import com.api.model.Periodicity;
import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }


    @Bean
    public ApplicationRunner applicationStartupRunner(
            EventRepository eventRepository,
            UserRepository userRepository
    ) {
        return args -> {
            var user = new User(
                    "Sahsa",
                    "Dima",
                    "sasha@g",
                    "imastringpasswor"
            );

            var x = new Event(
                    "Some",
                    "dest",
                    LocalDateTime.parse("2022-12-24T23:12:02:000".substring(0, 19)),
                    LocalDateTime.parse("2022-12-24T00:12:00:000".substring(0, 16)),
                    true,
                    Periodicity.MONTHLY,
                    user
            );
            userRepository.save(user);
            eventRepository.save(x);
            System.out.println(eventRepository.findAll());
        };
    }

}