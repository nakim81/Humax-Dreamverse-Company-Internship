package com.example.parking.parkinglot.converter;

import com.example.parking.common.annotation.Converter;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.entity.Parkinglot;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public class ParkinglotConverter {


    public ParkinglotDto toDto(Parkinglot entity) {
        return ParkinglotDto.builder()
                .codeNumber(entity.getCodeNumber())
                .name(entity.getName())
                .address(entity.getAddress())
                .operatingTime(entity.getOperatingTime())
                .normalSeason(entity.getNormalSeason())
                .tenantSeason(entity.getTenantSeason())
                .timeTicket(entity.getTimeTicket())
                .dayTicket(entity.getDayTicket())
                .specialDay(entity.getSpecialDay())
                .specialHour(entity.getSpecialHour())
                .specialNight(entity.getSpecialNight())
                .specialWeekend(entity.getSpecialWeekend())
                .applyDay(entity.getApplyDay())
                .applyHour(entity.getApplyHour())
                .applyNight(entity.getApplyNight())
                .applyWeekend(entity.getApplyWeekend())
                .is_active(entity.getIs_active())
                .operation(entity.getOperation())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .deletedAt(entity.getDeletedAt())
                .lat(entity.getLat())
                .lon(entity.getLon())
                .time(entity.getTime())
                .price(entity.getPrice())
                .build();
    }
}


