package com.api.repository;

import com.api.entity.Event;
import com.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Set<Event>> findEventsByOwner(User user);

    Optional<Event> findEventByOwnerAndDateFromAndDateTo(User user, LocalDateTime dateFrom, LocalDateTime dateTo);

}
