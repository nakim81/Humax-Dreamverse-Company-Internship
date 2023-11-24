package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_lot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Parkinglot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parkingId;
    private String codeNumber;
    private String name;
    private String address;
    private String operatingTime;
    private String normalSeason;
    private String tenantSeason;
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
    private Double lat;
    private Double lon;
    private String time;
    private String price;
    private Boolean deleteFlag;

    @OneToMany(mappedBy = "parkinglot", fetch = FetchType.LAZY)
    private List<Favorites> favoritesList = new ArrayList<>();

    @OneToMany(mappedBy = "parkinglot", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();

    @OneToMany(mappedBy = "parkinglot", fetch = FetchType.LAZY)
    private List<SearchHistory> searchHistoryList = new ArrayList<>();
}