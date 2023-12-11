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
    private String carNumber;
    private String ticket;
    private String payName;
    private Integer price;

    public BookDTO(Book book){
        this.bookId = book.getBookId();
        if(book.getParkinglot() != null)
            this.parkingLotId = book.getParkinglot().getParkingId();
        this.parkingLotName = book.getParkingLotName();
        this.state = book.getState().getNameValue();
        this.startTime = book.getStartTime();
        this.endTime = book.getEndTime();
        this.carNumber = book.getCarNumber();
        this.ticket = book.getTicket().getNameValue();
        this.payName = book.getPayName();
        this.price = book.getPrice();
    }
}
