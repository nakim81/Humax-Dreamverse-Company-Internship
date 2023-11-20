package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Car {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carId;
    private String carName;
    private Integer carNumber;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @Builder
    public Car(String carName, Integer carNumber) {
        this.carName = carName;
        this.carNumber = carNumber;
    }
}
