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

    // TODO 유저 인증 추가
    public ParkinglotDto getParkinglot(Long parkingId, Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
//
        Parkinglot parkingLot = parkingLotRepository.findById(parkingId).orElseThrow(() -> new ApiException(ParkinglotErrorCode.INVALID_CODENUMBER));
//
//        if(user.getSearchHistoryList().size() >= 3) {
//            SearchHistory oldestSearchHistory = user.getSearchHistoryList().get(0);
//            searchHistoryRepository.delete(oldestSearchHistory);
//            user.getSearchHistoryList().remove(oldestSearchHistory);
//        }

//        SearchHistory newSearchHistory = SearchHistory.builder()
//                .codeNumber(parkingLot.getCodeNumber())
//                .name(parkingLot.getName())
//                .build();
        SearchHistory newSearchHistory = new SearchHistory();

//        newSearchHistory.setUser(user);
//        user.getSearchHistoryList().add(newSearchHistory);
//        searchHistoryRepository.save(newSearchHistory);
//
        return parkinglotConverter.toDto(parkingLot);
    }

    //TODO 유저 인증 추가되면 지우기
    public ParkinglotDto findParkinglotByParkingId(Long parkingId) {
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
        return parkingLotRepository.findAll(pageable).map(parkinglotConverter::toDto);
    }
}
