package com.example.openapi;

public enum HicriMonthID {
    MUHARREM("1"),
    SAFER("2"),
    RABIULEVVEL("3"),
    RABIULAHIR("4"),
    CEMAZIYELEVVEL("5"),
    CEMAZIYELAHIR("6"),
    RECEP("7"),
    SABAN("8"),
    RAMAZAN("9"),
    SEVVAL("10"),
    ZILKADE("11"),
    ZILHICCE("12");

    private String code;

    HicriMonthID(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}