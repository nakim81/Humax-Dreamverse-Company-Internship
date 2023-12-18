package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.error.ParkinglotErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.entity.Parkinglot;
import com.example.parking.entity.SearchHistory;
import com.example.parking.entity.User;
import com.example.parking.converter.ParkinglotConverter;
import com.example.parking.repository.ParkingLotRepository;
import com.example.parking.repository.SearchHistoryRepository;
import com.example.parking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;
    private final ParkinglotConverter parkinglotConverter;
    private final UserRepository userRepository;
    private final SearchHistoryRepository searchHistoryRepository;


    public List<ParkinglotDto> getNearByParkinglots(double latitude, double longitude, double radius) {
        var nearestParkingLots = parkingLotRepository.findNearestParkingLots(latitude, longitude, radius);
        return nearestParkingLots.stream().map(parkinglotConverter::toDto).collect(Collectors.toList());
    }

    public ParkinglotDto getParkinglot(Long parkingId) {
        Parkinglot parkingLot = parkingLotRepository.findById(parkingId).orElseThrow(() -> new ApiException(ParkinglotErrorCode.INVALID_CODENUMBER));
        return parkinglotConverter.toDto(parkingLot);
    }

    @Transactional(readOnly = true)
    public Page<ParkinglotDto> findByNameOrAddressContains(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        var filteredParkingLots =  parkingLotRepository.findByNameOrAddressContains(keyword, pageable);
        return filteredParkingLots.map(parkinglotConverter::toDto);
    }

    public Page<ParkinglotDto> getAllParkinglot(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        var allParkinglot = parkingLotRepository.findAll(pageable);
        return allParkinglot.map(parkinglotConverter::toDto);
    }
}
