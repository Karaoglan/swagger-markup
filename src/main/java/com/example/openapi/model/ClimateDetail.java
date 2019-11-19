package com.example.openapi.model;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
@Getter
@Builder
public class ClimateDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private String text;
    private String place;
    private String pageNumber;
    private String bookName;
    private String author;
    private String publishedBy;
    private String publishedDate;
}
