package com.api;

import com.api.entity.Event;
import com.api.model.Periodicity;
import com.api.repository.EventRepository;
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
            EventRepository eventRepository
    ) {
        return args -> {

            DateTimeFormatter formatter
                    = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            var x = new Event(
                    "Some",
                    "dest",
                    LocalDateTime.parse("2022-12-24T00:12:00:000".substring(0, 16)),
                    LocalDateTime.parse("2022-12-24T00:12:00:000".substring(0, 16)),
                    true,
                    Periodicity.MONTHLY
            );

            eventRepository.save(x);
            System.out.println(eventRepository.findAll());
        };
    }

}