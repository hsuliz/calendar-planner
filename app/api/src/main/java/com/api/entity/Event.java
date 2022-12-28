package com.api.entity;

import com.api.model.Periodicity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
@Setter
@Getter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private User owner;

    @ManyToMany(mappedBy = "eventSet")
    private Set<User> userSet = new HashSet<>();


    public Event(String name, String description, LocalDateTime dateFrom, LocalDateTime dateTo, Boolean isPublic, Periodicity periodicity, User owner) {
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.isPublic = isPublic;
        this.periodicity = periodicity;
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", dateFrom=" + dateFrom +
                ", dateTo=" + dateTo +
                ", isPublic=" + isPublic +
                ", periodicity=" + periodicity;
    }
}
