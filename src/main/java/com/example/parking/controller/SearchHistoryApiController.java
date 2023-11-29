package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.SearchHistoryDto;
import com.example.parking.entity.User;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.SearchHistoryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchHistoryApiController {

    private final SearchHistoryService searchHistoryService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/user/searchHistory")
    public Api<List<SearchHistoryDto>> getSearchHistory(
        HttpServletRequest request
    ){
        String token = jwtTokenProvider.resolveToken(request);
        if (jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            var response = searchHistoryService.getSearchHistory(username);
            return Api.OK(response);
        } else {
            throw new ApiException(ErrorCode.INVALID_TOKEN);
        }
    }

    @PostMapping("/user/searchHistory/{parkingId}")
    public Api<Void> addSearchHistory(
        @PathVariable("parkingId") Long parkingId,
        HttpServletRequest request
    ){
        String token = jwtTokenProvider.resolveToken(request);
        if (jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            searchHistoryService.addSearchHistory(username, parkingId);
            return Api.OK(null);
        } else {
            throw new ApiException(ErrorCode.INVALID_TOKEN, "잘못된 토큰입니다");
        }
    }

    @DeleteMapping("/user/searchHistory/{historyId}")
    public Api<Void> deleteSearchHistory(
            HttpServletRequest request,
            @PathVariable("historyId") Long historyId
    ){
        String token = jwtTokenProvider.resolveToken(request);
        if (jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            searchHistoryService.deleteSearchHistory(username, historyId);
            return Api.OK(null);
        } else {
            throw new ApiException(ErrorCode.INVALID_TOKEN);
        }
    }
}
