package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.ParkingLotService;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ParkinglotApiController {

    private final ParkingLotService parkinglotService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/parkinglot/nearby")
    public Api<List<ParkinglotDto>> getNearByParkinglots(
            @RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius
    ) {
        var response = parkinglotService.getNearByParkinglots(latitude, longitude, radius);
        return Api.OK(response);
    }


    @GetMapping("/parkinglot/parkingId/{parkingId}")
    public Api<ParkinglotDto> getParkinglotByParkingId(
            @PathVariable("parkingId") Long parkingId
    ){
        var response = parkinglotService.getParkinglot(parkingId);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/search")
    public Api<Page<ParkinglotDto>> findParkingLotsByNameOrAddressContains(
            @RequestParam String keyword, @RequestParam int page, @RequestParam int size
    ){
        var response = parkinglotService.findByNameOrAddressContains(keyword, page, size);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/all")
    public Api<List<ParkinglotDto>> getAllParkinglot(){
        List<ParkinglotDto> response = parkinglotService.getAllParkinglot();
        return Api.OK(response);
    }
}
