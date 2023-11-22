package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.service.ParkingLotService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ParkinglotApiController {

    private final ParkingLotService parkinglotService;

    @GetMapping("/parkinglot/nearby")
    public Api<List<ParkinglotDto>> getNearByParkinglots(
            @RequestParam double latitude, @RequestParam double longitude
    ) {
        var response = parkinglotService.getNearByParkinglots(latitude, longitude);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/codeNumber/{codeNumber}")
    public Api<ParkinglotDto> getParkinglotByCodeNumber(
            @PathVariable("codeNumber") String codeNumber, HttpSession session
    ){
        var response = parkinglotService.getParkinglot(codeNumber, session);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/codenumber/{codenumber}")
    public Api<ParkinglotDto> findParkinglotByCodenumber(
            @PathVariable("codenumber") String codenumber
    ){
        var response = parkinglotService.findParkinglotByCodenumber(codenumber);
        return Api.OK(response);
    }

    @GetMapping("/parkinglot/search")
    public Api<List<ParkinglotDto>> findParkingLotsByNameOrAddressContains(
            @RequestParam String keyword
    ){
        var response = parkinglotService.findByNameOrAddressContains(keyword);
        return Api.OK(response);
    }
}
