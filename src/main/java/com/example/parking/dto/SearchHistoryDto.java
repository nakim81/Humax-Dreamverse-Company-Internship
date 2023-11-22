package com.example.parking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SearchHistoryDto {
    private Integer historyId;
    private String codeNumber;
    private String name;
}
