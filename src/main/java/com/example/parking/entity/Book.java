package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;
    private String name;
    private String state;
    private String carNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer price;
    private String pay;
    private String ticket;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="code_number")
    private Parkinglot parkinglot;

    @Builder
    public Book(String name, String state, String carNumber, LocalDateTime startTime,
                LocalDateTime endTime, Integer price, String pay, String ticket, User user, Parkinglot parkinglot){
        this.name = name;
        this.state = state;
        this.carNumber = carNumber;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.pay =  pay;
        this.ticket = ticket;
        this.user = user;
        this.parkinglot = parkinglot;
    }
}
