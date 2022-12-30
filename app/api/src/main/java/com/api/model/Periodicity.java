package com.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Periodicity {
    @JsonProperty("once")
    ONCE,
    @JsonProperty("daily")
    DAILY,
    @JsonProperty("weekly")
    WEEKLY,
    @JsonProperty("monthly")
    MONTHLY,
    @JsonProperty("monthly")
    YEARLY
}
