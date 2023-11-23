package com.example.parking.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ParkinglotDto {
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
    private List<Object> favoritesList = List.of();
    private List<Object> bookList = List.of();
}
