package com.example.parking.dto;

import com.example.parking.common.enums.BookState;
import com.example.parking.entity.Book;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @NoArgsConstructor
public class BookDTO {
    private Long bookId;
    private Long parkingLotId;
    private String parkingLotName;
    private BookState state;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long carId;
    private String carNumber;
    private Integer price;
    private String ticket;
    private Long payId;
    private String payName;

    public BookDTO(Book book){
        this.bookId = book.getBookId();
        this.parkingLotId = book.getParkinglot().getParkingId();
        this.parkingLotName = book.getParkinglot().getName();
        this.state = book.getState();
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
