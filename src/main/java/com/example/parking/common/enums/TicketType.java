package com.example.parking.common.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum TicketType {
    Day("1", "종일권"), Time("2", "시간권");

    String codeValue;
    String nameValue;

    TicketType(String codeValue, String nameValue){
        this.codeValue = codeValue;
        this.nameValue = nameValue;
    }

    public static TicketType getEnum(String codeValue){
        return Arrays.stream(TicketType.values())
                .filter( t -> t.getCodeValue().equals(codeValue))
                .findAny().orElse(null);
    }
}
