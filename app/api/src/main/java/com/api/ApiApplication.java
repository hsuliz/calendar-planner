package com.api;

import com.api.repository.EventRepository;
import com.api.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
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
            UserRepository userRepository
    ) {
        return args -> {

        };
    }

}