package com.example.parking.dto;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
@Getter
public class OutDTO {
    LocalDateTime enterTime;
    Integer price;

    public OutDTO(LocalDateTime enterTime, Integer price){
        this.enterTime = enterTime;
        this.price = price;
    }
}
