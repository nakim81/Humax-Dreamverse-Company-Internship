package com.example.parking.controller;

import com.example.parking.dto.CarDto;
import com.example.parking.entity.Car;
import com.example.parking.entity.User;
import com.example.parking.repository.CarRepository;
import com.example.parking.repository.UserRepository;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/{userId}/car")
public class CarController {
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    @Autowired
    public CarController(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    // 조회
    @GetMapping
    public ResponseEntity<List<CarDto>> getCarsByUserId(@PathVariable Integer userId) {
        List<Car> cars = carRepository.findByUserUserId(userId);

        if (!cars.isEmpty()) {
            List<CarDto> carDtos = cars.stream()
                    .map(car -> new CarDto(car.getCarName(), car.getCarNumber()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(carDtos);
        } else {  //예외처리
            return ResponseEntity.notFound().build();
        }
    }

    // 등록
    @PostMapping
    public ResponseEntity<CarDto> addCarToUser(@PathVariable Integer userId, @RequestBody CarDto carDto) {
        User user = userRepository.findById(userId)
                // 예외처리
                .orElseThrow(() -> new OpenApiResourceNotFoundException("User not found with id: " + userId));

        Car newCar = new Car();
        newCar.setCarNumber(carDto.getCarNumber());
        newCar.setCarName(carDto.getCarName());

        newCar.setUser(user);

        Car savedCar = carRepository.save(newCar);

        CarDto savedCarDto = new CarDto();
        savedCarDto.setCarNumber(savedCar.getCarNumber());
        savedCarDto.setCarName(savedCar.getCarName());

        return new ResponseEntity<>(savedCarDto, HttpStatus.CREATED);
    }

    // 수정
    @PatchMapping("/{carId}")
    public ResponseEntity<CarDto> updateCar(@PathVariable Integer carId, @RequestBody CarDto carDto, @PathVariable String userId) {
        Car existingCar = carRepository.findById(carId)
                // 예외처리
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Car not found with id: " + carId));

        if (carDto.getCarName() != null) {
            existingCar.setCarName((carDto.getCarName()));
            }

        if (carDto.getCarNumber() != null) {
            existingCar.setCarNumber((carDto.getCarNumber()));
        }

        Car updatedCar = carRepository.save(existingCar);

        CarDto updatedCarDto = new CarDto();
        updatedCarDto.setCarNumber(updatedCar.getCarNumber());
        updatedCarDto.setCarName(updatedCar.getCarName());

        return ResponseEntity.ok(updatedCarDto);
    }

    // 삭제
    @DeleteMapping("/{carId}")
    public ResponseEntity<String> deleteCar(@PathVariable Integer userId, @PathVariable Integer carId) {

        User user = userRepository.findById(userId)
                // 예외처리
                .orElseThrow(() -> new OpenApiResourceNotFoundException("User not found with id: " + userId));

        Car car = carRepository.findById(carId)
                // 예외처리
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Car not found with id: " + carId));

        // 삭제하려는 사용자와 해당 차 소유자와 일치하는지 확인
        if (!car.getUser().equals(user)) {
            // 예외처리
            throw new OpenApiResourceNotFoundException("사용자가 동일하지 않아 삭제할 수 없습니다.");
        }

        carRepository.deleteById(carId);

        return new ResponseEntity<>("차 정보가 삭제되었습니다.", HttpStatus.OK);
    }


}
