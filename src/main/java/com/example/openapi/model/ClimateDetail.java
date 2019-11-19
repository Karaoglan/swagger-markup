package com.example.openapi.model;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Builder
public class ClimateDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    @Column(length = 2000)
    private String text;
    private String place;
    private String pageNumber;
    private String bookName;
    private String author;
    private String publishedBy;
    private String publishedDate;
    private boolean yearExist;
    private boolean monthExist;
    private boolean dayExist;
}
