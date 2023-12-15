package com.example.parking.controller;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.CarDto;
import com.example.parking.dto.CarInfoDto;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user/car")
public class CarController {
    private final JwtTokenProvider jwtTokenProvider;
    private final CarService carService;

    @Autowired
    public CarController(CarService carService, JwtTokenProvider jwtTokenProvider) {
        this.carService = carService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping
    public ResponseEntity<List<CarInfoDto>> getCarsByUserId(
           @RequestHeader("Authorization") String AccessToken
        ) {
            String token = AccessToken.split(" ")[1];
            if (token==null || !jwtTokenProvider.validateToken(token))
                throw new ApiException(ErrorCode.INVALID_TOKEN, "유효하지 않은 토큰");
            String userId = jwtTokenProvider.getUsername(token);
        List<CarInfoDto> carInfoDtos = carService.getCarsByUserId(userId);
            return ResponseEntity.ok(carInfoDtos);
    }

    // 등록
    @PostMapping
    public ResponseEntity<CarDto> addCarToUser(
            @RequestHeader("Authorization") String AccessToken,
            @RequestBody CarDto carDto
    ) {
        String token = AccessToken.split(" ")[1];
        if (token==null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.INVALID_TOKEN, "유효하지 않은 토큰");
        String userId = jwtTokenProvider.getUsername(token);
        CarDto savedCarDto = carService.addCarToUser(userId, carDto);
        return ResponseEntity.ok(savedCarDto);
    }

    // 수정
    @PatchMapping("/{carId}")
    public ResponseEntity<CarDto> updateCar(
            @RequestHeader("Authorization") String AccessToken,
            @PathVariable Long carId, @RequestBody CarDto carDto
    ) {
        String token = AccessToken.split(" ")[1];
        if (token==null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.INVALID_TOKEN, "유효하지 않은 토큰");
        CarDto updatedCarDto = carService.updateCar(carId, carDto);
        return ResponseEntity.ok(updatedCarDto);
    }

    // 삭제
    @DeleteMapping("/{carId}")
    public ResponseEntity<String> deleteCar(
            @RequestHeader("Authorization") String AccessToken,
            @PathVariable Long carId
    ) {
        String token = AccessToken.split(" ")[1];
        if (token==null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.INVALID_TOKEN, "유효하지 않은 토큰");
        String userId = jwtTokenProvider.getUsername(token);
        carService.deleteCar(userId, carId);

        return ResponseEntity.ok("차량이 삭제되었습니다.");
    }


}
