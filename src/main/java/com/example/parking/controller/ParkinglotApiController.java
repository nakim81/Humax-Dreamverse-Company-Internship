package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.service.ParkingLotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/parkinglot")
@RequiredArgsConstructor
public class ParkinglotApiController {

    private final ParkingLotService parkinglotService;

    @GetMapping("/nearby")
    public Api<List<ParkinglotDto>> getNearByParkinglots(
            @RequestParam double latitude, @RequestParam double longitude
    ) {
        var response = parkinglotService.getNearByParkinglots(latitude, longitude);
        return Api.OK(response);
    }
}
