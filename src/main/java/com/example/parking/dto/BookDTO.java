package com.example.parking.dto;

import com.example.parking.common.enums.TicketType;
import com.example.parking.entity.Book;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookDTO {
    private Long bookId;
    private Long parkingLotId;
    private String parkingLotName;
    private String state;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
    private Long carId;
    private String carNumber;
    private Integer price;
    private TicketType ticket;
    private Long payId;
    private String payName;

    public BookDTO(Book book){
        this.bookId = book.getBookId();
        this.parkingLotId = book.getParkinglot().getParkingId();
        this.parkingLotName = book.getParkinglot().getName();
        this.state = book.getState().getNameValue();
        this.startTime = book.getStartTime();
        this.endTime = book.getEndTime();
        this.carId = book.getCar().getCarId();
        this.carNumber = book.getCar().getCarNumber();
        this.price = book.getPrice();
        this.ticket = book.getTicket();
        this.payId = book.getPay().getPayId();
        this.payName = book.getPay().getPayName();
    }
}
