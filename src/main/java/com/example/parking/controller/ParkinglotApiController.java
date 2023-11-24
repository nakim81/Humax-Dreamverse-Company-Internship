package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.service.ParkingLotService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ParkinglotApiController {

    private final ParkingLotService parkinglotService;

    @GetMapping("/parkinglot/nearby")
    public Api<List<ParkinglotDto>> getNearByParkinglots(
            @RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius
    ) {
        var response = parkinglotService.getNearByParkinglots(latitude, longitude, radius);
        return Api.OK(response);
    }


    @GetMapping("/parkinglot/codeNumber/{parkingId}")
    public Api<ParkinglotDto> getParkinglotByCodeNumber(
            @PathVariable("parkingId") Long parkingId, @RequestParam Long userId
    ){
        var response = parkinglotService.getParkinglot(parkingId, userId);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/parkingId/{parkingId}")
    public Api<ParkinglotDto> findParkinglotByCodenumber(
            @PathVariable("parkingId") Long parkingId
    ){
        var response = parkinglotService.findParkinglotByParkingId(parkingId);
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
    public Api<Page<ParkinglotDto>> getAllParkinglot(
            @RequestParam int page, @RequestParam int size
    ){
        var response = parkinglotService.getAllParkinglot(page, size);
        return Api.OK(response);
    }
}
