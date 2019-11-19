package com.example.openapi.model;

public enum CalendarOption {
    MILADI("1"),
    HICRI("2"),
    RUMI("3");

    private String code;

    CalendarOption(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}