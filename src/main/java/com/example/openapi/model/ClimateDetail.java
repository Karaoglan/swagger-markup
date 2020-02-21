package com.example.openapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClimateDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private String originalDate;
    @Column(length = 10000)
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
