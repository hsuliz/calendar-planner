package com.api;

import com.api.entity.User;
import com.api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        return args -> {
            var user = new User(
                    "test@test.com",
                    passwordEncoder.encode("test")
            );
            userRepository.save(user);
        };
    }

}
