package com.example.parking.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SearchHistoryErrorCode implements ErrorCodeIfs {

    SEARCH_HISTORY_NOT_FOUND(502, 2000, "Search History Not Found");

    private final Integer httpStatusCode;
    private final Integer errorCode;
    private final String description;
}
