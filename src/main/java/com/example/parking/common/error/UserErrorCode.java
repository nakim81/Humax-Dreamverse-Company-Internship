package com.example.parking.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserErrorCode implements ErrorCodeIfs{
    DUPLICATE_ID(HttpStatus.BAD_REQUEST.value(), 409, "중복된 유저 ID입니다."),
    DUPLICATE_PHONENUM(HttpStatus.BAD_REQUEST.value(), 409, "중복된 전화번호입니다."),
    DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST.value(), 409, "중복된 이메일입니다."),
    USER_REPOSITORY_NOT_INITIALIZED(HttpStatus.INTERNAL_SERVER_ERROR.value(), 513, "UserRepository가 초기화되지 않았습니다.")
    ;

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;

}
