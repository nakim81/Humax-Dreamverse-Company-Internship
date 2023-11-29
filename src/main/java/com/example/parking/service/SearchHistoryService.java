package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.error.ParkinglotErrorCode;
import com.example.parking.common.error.SearchHistoryErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.converter.SearchHistoryConverter;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.entity.Parkinglot;
import com.example.parking.entity.SearchHistory;
import com.example.parking.entity.User;
import com.example.parking.repository.ParkingLotRepository;
import com.example.parking.repository.SearchHistoryRepository;
import com.example.parking.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final UserRepository userRepository;
    private final SearchHistoryConverter searchHistoryConverter;

    public List<SearchHistoryDto> getSearchHistory(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "유저 정보가 존재하지 않습니다."));
        List<SearchHistory> searchHistoryList = searchHistoryRepository.findByUserOrderByHistoryIdDesc(user);
        return searchHistoryList.stream()
                .map(searchHistoryConverter::toDto)
                .collect(Collectors.toList());
    }

    public void addSearchHistory(String userId, Long parkingId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "유저 정보가 존재하지 않습니다."));
        Parkinglot parkinglot = parkingLotRepository.findById(parkingId).orElseThrow(() -> new ApiException(ParkinglotErrorCode.INVALID_CODENUMBER, "주차장을 찾을 수 없습니다. 잘못된 주차장 ID"));

        SearchHistory searchHistory = SearchHistory.builder()
                .user(user)
                .parkinglot(parkinglot)
                .build();

        searchHistoryRepository.save(searchHistory);

        if(user.getSearchHistoryList().size() > 3) {
            SearchHistory oldestSearchHistory = user.getSearchHistoryList().get(0);
            searchHistoryRepository.delete(oldestSearchHistory);
        }
    }
    public void deleteSearchHistory(String userId, Long historyId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
        SearchHistory searchHistory = searchHistoryRepository.findById(historyId).orElseThrow(() -> new ApiException(SearchHistoryErrorCode.SEARCH_HISTORY_NOT_FOUND));

        if (!searchHistory.getUser().equals(user)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유저 정보가 맞지 않습니다");
        }

        user.getSearchHistoryList().remove(searchHistory);
        userRepository.save(user);

        searchHistoryRepository.delete(searchHistory);
    }
}
