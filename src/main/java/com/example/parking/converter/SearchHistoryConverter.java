package com.example.parking.converter;

import com.example.parking.common.annotation.Converter;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.dto.UserDto;
import com.example.parking.entity.SearchHistory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Converter
@RequiredArgsConstructor
public class SearchHistoryConverter {

    private final ParkinglotConverter parkinglotConverter;

    public SearchHistoryDto toDto(SearchHistory entity) {
        return Optional.ofNullable(entity)
                .map(it -> {
                    return SearchHistoryDto.builder()
                            .historyId(entity.getHistoryId())
                            .parkinglot(parkinglotConverter.toDto(entity.getParkinglot()))
                            .build();
                })
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
    }
}
