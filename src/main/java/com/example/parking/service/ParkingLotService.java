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
import jakarta.servlet.http.HttpSession;
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
    private final UserRepository userRepository;
    private final SearchHistoryRepository searchHistoryRepository;


    public List<ParkinglotDto> getNearByParkinglots(double latitude, double longitude) {
        var nearestParkingLots = parkingLotRepository.findNearestParkingLots(latitude, longitude);
        return nearestParkingLots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }

    public ParkinglotDto getParkinglot(String codeNumber, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));

        Parkinglot parkingLot = parkingLotRepository.findById(codeNumber).orElseThrow(() -> new ApiException(ParkinglotErrorCode.INVALID_CODENUMBER));

        if(user.getSearchHistoryList().size() >= 3) {
            SearchHistory oldestSearchHistory = user.getSearchHistoryList().get(0);
            searchHistoryRepository.delete(oldestSearchHistory);
            user.getSearchHistoryList().remove(oldestSearchHistory);
        }

        SearchHistory newSearchHistory = SearchHistory.builder()
                .codeNumber(parkingLot.getCodeNumber())
                .name(parkingLot.getName())
                .build();

        newSearchHistory.setUser(user);
        user.getSearchHistoryList().add(newSearchHistory);
        searchHistoryRepository.save(newSearchHistory);

        return parkinglotConverter.toDto(parkingLot);
    }

    //유저 인증 추가되면 지울 예정
    public ParkinglotDto findParkinglotByCodenumber(String codenumber) {
        Parkinglot parkingLot = parkingLotRepository.findById(codenumber).orElseThrow(() -> new ApiException(ParkinglotErrorCode.INVALID_CODENUMBER));
        return parkinglotConverter.toDto(parkingLot);

    }

    @Transactional(readOnly = true)
    public List<ParkinglotDto> findByNameOrAddressContains(String keyword) {
        var filteredParkingLots =  parkingLotRepository.findByNameOrAddressContains(keyword);
        return filteredParkingLots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }
}
