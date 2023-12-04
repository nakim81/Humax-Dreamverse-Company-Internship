package com.example.parking.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data @Getter @NoArgsConstructor
public class EnterDTO {
    private String carNumber;
    private String parkingLotName;
}
