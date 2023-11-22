package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.service.SearchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchHistoryApiController {

    private final SearchHistoryService searchHistoryService;

    @GetMapping("/user/{userId}/searchHistory")
    public Api<List<SearchHistoryDto>> getSearchHistory(
        @PathVariable("userId") Integer userId
    ){
        var response = searchHistoryService.getSearchHistory(userId);
        return Api.OK(response);
    }
}
