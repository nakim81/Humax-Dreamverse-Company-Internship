package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.converter.SearchHistoryConverter;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.entity.SearchHistory;
import com.example.parking.entity.User;
import com.example.parking.repository.SearchHistoryRepository;
import com.example.parking.repository.UserRepository;
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

}
