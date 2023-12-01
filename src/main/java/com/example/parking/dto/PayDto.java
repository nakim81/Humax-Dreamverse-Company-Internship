package com.example.parking.dto;


import com.example.parking.entity.Pay;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PayDto {

    private Long payId;

    private String payName;

    private String payType;

    private Integer payNumber;

    public static PayDto of(Pay payEntity) {

        return new PayDto(
                payEntity.getPayId(),
                payEntity.getPayName(),
                payEntity.getPayType(),
                payEntity.getPayNumber()
        );

    }
}
