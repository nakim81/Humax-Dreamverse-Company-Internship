package com.example.parking.dto;


import com.example.parking.entity.Pay;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PayDto {

    private Long pay_id;

    private String pay_name;

    private String pay_type;

    private Integer pay_number;

    public static PayDto of(Pay payEntity) {

        return new PayDto(
                payEntity.getPayId(),
                payEntity.getPayName(),
                payEntity.getPayType(),
                payEntity.getPayNumber()
        );

    }
}
