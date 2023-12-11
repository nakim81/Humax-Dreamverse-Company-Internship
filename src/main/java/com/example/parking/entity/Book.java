package com.example.parking.entity;

import com.example.parking.common.enums.BookState;
import com.example.parking.common.enums.TicketType;
import com.example.parking.converter.BookStateTypeConverter;
import com.example.parking.converter.TicketTypeConverter;
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
    @Convert(converter = TicketTypeConverter.class)
    private TicketType ticket;
    private String payName;
    private String carNumber;
    private String parkingLotName;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="parking_id")
    private Parkinglot parkinglot;

    @Builder
    public Book(BookState state, LocalDateTime startTime, LocalDateTime endTime, Integer price, TicketType ticket,
                String carNumber, String payName, String parkingLotName, User user, Parkinglot parkinglot){
        this.state = state;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.ticket = ticket;
        this.carNumber = carNumber;
        this.payName = payName;
        this.parkingLotName = parkingLotName;
        this.user = user;
        this.parkinglot = parkinglot;
    }
}
