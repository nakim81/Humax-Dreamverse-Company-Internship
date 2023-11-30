package com.example.parking.common.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum BookState {
    READY_TO_USE("1", "이용 대기"),
    CANCELED("2", "예약 취소"),
    USED("3", "이용 종료"),
    NO_USE("4", "미사용 취소");

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
