package com.example.openapi.model;

public enum WeatherTags {
    WINDY("rüzgar"),
    RAINY("yağmur"),
    SUNNY("güneş"),
    FIRE("yangın"),
    PEST("veba");

    private final String value;

    WeatherTags(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
