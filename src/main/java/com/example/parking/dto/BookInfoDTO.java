package com.example.parking.dto;

import com.example.parking.entity.Book;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookInfoDTO {
    private Integer bookId;
    private String name;
    private String state;
    private String carNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer price;
    private String pay;
    private String ticket;
    public BookInfoDTO(Book book){
        this.bookId = book.getBookId();
        this.name = book.getName();
        this.state = book.getState();
        this.carNumber = book.getCarNumber();
        this.startTime = book.getStartTime();
        this.endTime = book.getEndTime();
        this.price = book.getPrice();
        this.pay = book.getPay();
        this.ticket = book.getTicket();
    }
}
