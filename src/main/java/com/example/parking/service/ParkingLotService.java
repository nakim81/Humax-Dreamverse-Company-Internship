package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.parkinglot.converter.ParkinglotConverter;
import com.example.parking.repository.ParkingLotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;
    private final ParkinglotConverter parkinglotConverter;


    public List<ParkinglotDto> getNearByParkinglots(double latitude, double longitude) {
        var nearestParkingLots = parkingLotRepository.findNearestParkingLots(latitude, longitude);
        return nearestParkingLots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }

    public ParkinglotDto getParkinglot(String codeNumber) {
        var entity = parkingLotRepository.findById(codeNumber).map(it -> {
                    return it;
                })
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
        return parkinglotConverter.toDto(entity);
    }

    @Transactional(readOnly = true)
    public List<ParkinglotDto> findByNameOrAddressContains(String keyword) {
        var filteredParkingLots =  parkingLotRepository.findByNameOrAddressContains(keyword);
        return filteredParkingLots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }
}
