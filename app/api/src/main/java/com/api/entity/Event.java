package com.api.entity;

import com.api.model.Periodicity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity(name = "events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDateTime dateFrom;
    private LocalDateTime dateTo;
    private Boolean isPublic;
    private Periodicity periodicity;

    public Event(String name, String description, LocalDateTime dateFrom, LocalDateTime dateTo, Boolean isPublic, Periodicity periodicity) {
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.isPublic = isPublic;
        this.periodicity = periodicity;
    }

}
