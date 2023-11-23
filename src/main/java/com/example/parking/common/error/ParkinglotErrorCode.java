package com.example.parking.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ParkinglotErrorCode implements ErrorCodeIfs{

    INVALID_CODENUMBER(400, 1000, "INVALID CODENUMBER");

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
