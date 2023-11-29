package com.example.parking.dto;

import com.example.parking.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SearchHistoryDto {
    private Long historyId;
    private ParkinglotDto parkinglot;
}
