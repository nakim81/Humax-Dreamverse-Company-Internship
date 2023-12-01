package com.example.parking.dto;

import com.example.parking.common.enums.TicketType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data @Getter
public class AddBookDTO {
    private Long parkingLotId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
    private Long carId;
    @NotNull
    private Integer price;
    private TicketType ticket;
    private Long payId;
}
