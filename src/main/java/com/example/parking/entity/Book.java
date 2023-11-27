package com.example.parking.entity;

import com.example.parking.common.enums.BookState;
import com.example.parking.converter.BookStateTypeConverter;
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
    private Long bookId;
    @Convert(converter = BookStateTypeConverter.class)
    private BookState state;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer price;
    private String ticket;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="parking_id")
    private Parkinglot parkinglot;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="car_id")
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="pay_id")
    private Pay pay;

    @Builder
    public Book(BookState state, LocalDateTime startTime, LocalDateTime endTime, Integer price, String ticket,
                User user, Parkinglot parkinglot, Car car, Pay pay){
        this.state = state;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.ticket = ticket;
        this.user = user;
        this.parkinglot = parkinglot;
        this.car = car;
        this.pay = pay;
    }
}
