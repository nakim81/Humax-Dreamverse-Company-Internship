package com.example.parking.controller;

import com.example.parking.dto.CarDto;
import com.example.parking.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user/{userId}/car")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    // 조회
    @GetMapping
    public ResponseEntity<List<CarDto>> getCarsByUserId(@PathVariable Integer userId) {

        List<CarDto> carDtos = carService.getCarsByUserId(userId);
        return ResponseEntity.ok(carDtos);
    }

    // 등록
    @PostMapping
    public ResponseEntity<CarDto> addCarToUser(@PathVariable Integer userId, @RequestBody CarDto carDto) {
        CarDto savedCarDto = carService.addCarToUser(userId, carDto);
        return ResponseEntity.ok(savedCarDto);
    }

    // 수정
    @PatchMapping("/{carId}")
    public ResponseEntity<CarDto> updateCar(@PathVariable Integer carId, @RequestBody CarDto carDto) {
        CarDto updatedCarDto = carService.updateCar(carId, carDto);
        return ResponseEntity.ok(updatedCarDto);
    }

    // 삭제
    @DeleteMapping("/{carId}")
    public ResponseEntity<String> deleteCar(@PathVariable Integer userId, @PathVariable Integer carId) {
        carService.deleteCar(userId, carId);

        return ResponseEntity.ok("차량이 삭제되었습니다.");
    }


}
