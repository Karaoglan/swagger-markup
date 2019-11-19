package com.example.openapi.model;

public enum TurkishMonths {
    OCAK("1"),
    ŞUBAT("2"),
    MART("3"),
    NISAN("4"),
    MAYIS("5"),
    HAZIRAN("6"),
    TEMMUZ("7"),
    AĞUSTOS("8"),
    EYLÜL("9"),
    EKIM("10"),
    KASIM("11"),
    ARALIK("12");

    private String code;

    TurkishMonths(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}