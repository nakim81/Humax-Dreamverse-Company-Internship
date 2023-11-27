package com.example.parking.common.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum BookState {
    READY_TO_USE("1", "이용 대기"),
    CANCELED("2", "예약 취소"),
    IN_USE("3", "이용중"),
    USED("4", "이용 종료");

    private String codeValue;
    private String nameValue;

    BookState(String codeValue, String nameValue){
        this.codeValue = codeValue;
        this.nameValue = nameValue;
    }

    public static BookState getEnum(String codeValue){
        return Arrays.stream(BookState.values())
                .filter( t -> t.getCodeValue().equals(codeValue))
                .findAny().orElse(null);
    }
}
