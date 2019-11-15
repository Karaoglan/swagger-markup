package com.example.openapi;

public enum HicriMonthID {
    MUHARREM("1", "M"),
    SAFER("2", "S"),
    RABIULEVVEL("3", "RA"),
    RABIULAHIR("4", "R"),
    CEMAZIYELEVVEL("5", "CA"),
    CEMAZIYELAHIR("6", "C"),
    RECEP("7", "B"),
    SABAN("8", "Ş"),
    RAMAZAN("9", "N"),
    SEVVAL("10", "L"),
    ZILKADE("11", "ZA"),
    ZILHICCE("12", "Z");

    private String value;
    private String code;

    HicriMonthID(String value, String code) {
        this.value = value;
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public String getCode() {
        return code;
    }
}