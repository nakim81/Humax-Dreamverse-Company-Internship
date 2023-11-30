package com.example.parking.converter;

import com.example.parking.common.annotation.Converter;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.entity.Parkinglot;
import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.function.Consumer;

@Converter
@RequiredArgsConstructor
public class ParkinglotConverter {

    public ParkinglotDto toDto(Parkinglot entity) {
        return Optional.ofNullable(entity)
                .map(it -> {
                    return ParkinglotDto.builder()
                            .parkingId(entity.getParkingId())
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
                            .deleteFlag(entity.getDeleteFlag())
                            .build();
                })
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
    }

    public Parkinglot toEntity(ParkinglotDto dto) {
        return Optional.ofNullable(dto)
                .map(it -> Parkinglot.builder()
                        .parkingId(dto.getParkingId())
                        .codeNumber(dto.getCodeNumber())
                        .name(dto.getName())
                        .address(dto.getAddress())
                        .operatingTime(dto.getOperatingTime())
                        .normalSeason(dto.getNormalSeason())
                        .tenantSeason(dto.getTenantSeason())
                        .timeTicket(dto.getTimeTicket())
                        .dayTicket(dto.getDayTicket())
                        .specialDay(dto.getSpecialDay())
                        .specialHour(dto.getSpecialHour())
                        .specialNight(dto.getSpecialNight())
                        .specialWeekend(dto.getSpecialWeekend())
                        .applyDay(dto.getApplyDay())
                        .applyHour(dto.getApplyHour())
                        .applyNight(dto.getApplyNight())
                        .applyWeekend(dto.getApplyWeekend())
                        .is_active(dto.getIs_active())
                        .operation(dto.getOperation())
                        .createdAt(dto.getCreatedAt())
                        .updatedAt(dto.getUpdatedAt())
                        .deletedAt(dto.getDeletedAt())
                        .lat(dto.getLat())
                        .lon(dto.getLon())
                        .time(dto.getTime())
                        .price(dto.getPrice())
                        .deleteFlag(dto.getDeleteFlag())
                        .build()
                )
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
    }

    public void updateEntity(Parkinglot existingEntity, ParkinglotDto dto) {
        Optional.ofNullable(dto)
                .ifPresent(it -> {
                    updateFieldIfExists(existingEntity::setCodeNumber, it.getCodeNumber());
                    updateFieldIfExists(existingEntity::setName, it.getName());
                    updateFieldIfExists(existingEntity::setAddress, it.getAddress());
                    updateFieldIfExists(existingEntity::setOperatingTime, it.getOperatingTime());
                    updateFieldIfExists(existingEntity::setNormalSeason, it.getNormalSeason());
                    updateFieldIfExists(existingEntity::setTenantSeason, it.getTenantSeason());
                    updateFieldIfExists(existingEntity::setTimeTicket, it.getTimeTicket());
                    updateFieldIfExists(existingEntity::setDayTicket, it.getDayTicket());
                    updateFieldIfExists(existingEntity::setSpecialDay, it.getSpecialDay());
                    updateFieldIfExists(existingEntity::setSpecialHour, it.getSpecialHour());
                    updateFieldIfExists(existingEntity::setSpecialNight, it.getSpecialNight());
                    updateFieldIfExists(existingEntity::setSpecialWeekend, it.getSpecialWeekend());
                    updateFieldIfExists(existingEntity::setApplyDay, it.getApplyDay());
                    updateFieldIfExists(existingEntity::setApplyHour, it.getApplyHour());
                    updateFieldIfExists(existingEntity::setApplyNight, it.getApplyNight());
                    updateFieldIfExists(existingEntity::setApplyWeekend, it.getApplyWeekend());
                    updateFieldIfExists(existingEntity::setIs_active, it.getIs_active());
                    updateFieldIfExists(existingEntity::setOperation, it.getOperation());
                    updateFieldIfExists(existingEntity::setCreatedAt, it.getCreatedAt());
                    updateFieldIfExists(existingEntity::setUpdatedAt, it.getUpdatedAt());
                    updateFieldIfExists(existingEntity::setDeletedAt, it.getDeletedAt());
                    updateFieldIfExists(existingEntity::setLat, it.getLat());
                    updateFieldIfExists(existingEntity::setLon, it.getLon());
                    updateFieldIfExists(existingEntity::setTime, it.getTime());
                    updateFieldIfExists(existingEntity::setPrice, it.getPrice());
                    updateFieldIfExists(existingEntity::setDeleteFlag, it.getDeleteFlag());
                });
    }

    private <T> void updateFieldIfExists(Consumer<T> setter, T value) {
        Optional.ofNullable(value).ifPresent(setter);
    }
}


