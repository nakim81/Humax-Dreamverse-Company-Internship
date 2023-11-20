package com.example.parking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter
public class Parkinglot {
    @Id
    private String codeNumber;
    private String name;
    private String address;
    private String operatingTime;
    private Integer normalSeason;
    private Integer tenantSeason;
    private String timeTicket;
    private String dayTicket;
    private String specialDay;
    private String specialHour;
    private String specialNight;
    private String specialWeekend;
    private String applyDay;
    private String applyHour;
    private String applyNight;
    private String applyWeekend;
    private String is_active;
    private String operation;
    private String createdAt;
    private String updatedAt;
    private String deletedAt;
    private String lat;
    private String lon;
    private String time;
    private String price;

    @OneToMany(mappedBy = "parkinglot", fetch = FetchType.LAZY)
    private List<Favorites> favoritesList = new ArrayList<>();

    @OneToMany(mappedBy = "parkinglot", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();
}