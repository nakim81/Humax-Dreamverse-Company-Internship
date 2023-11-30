package com.example.parking.dto;

import com.example.parking.common.enums.TicketType;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data @Getter
public class AddBookDTO {
    private Long bookId;
    private Long parkingLotId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long carId;
    private Integer price;
    private TicketType ticket;
    private Long payId;
}
