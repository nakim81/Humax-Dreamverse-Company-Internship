package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.error.SearchHistoryErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.converter.SearchHistoryConverter;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.entity.SearchHistory;
import com.example.parking.entity.User;
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
    private final UserRepository userRepository;
    private final SearchHistoryConverter searchHistoryConverter;

    public List<SearchHistoryDto> getSearchHistory(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT));
        List<SearchHistory> searchHistoryList = searchHistoryRepository.findByUserOrderByHistoryIdDesc(user);
        return searchHistoryList.stream()
                .map(searchHistoryConverter::toDto)
                .collect(Collectors.toList());
    }

    //TODO 유저 인증 방버 바꾸기 EX) Spring Security 등
    public void deleteSearchHistory(Integer userId, Integer historyId) {
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
