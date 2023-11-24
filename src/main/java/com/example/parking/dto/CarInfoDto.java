package com.example.parking.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class CarInfoDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    private String carName;
    private String carNumber;

    public CarInfoDto(Long carId, String carName, String carNumber) {
        this.carId = carId;
        this.carName = carName;
        this.carNumber = carNumber;
    }
}



