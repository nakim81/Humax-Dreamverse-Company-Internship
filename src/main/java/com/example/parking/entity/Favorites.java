package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity @Getter
public class Favorites {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeId;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="code_number")
    private Parkinglot parkinglot;
}
