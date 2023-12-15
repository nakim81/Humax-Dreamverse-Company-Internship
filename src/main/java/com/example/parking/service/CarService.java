package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.CarDto;
import com.example.parking.dto.CarInfoDto;
import com.example.parking.entity.Car;
import com.example.parking.entity.User;
import com.example.parking.repository.CarRepository;
import com.example.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    @Autowired
    public CarService(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    // 예외처리
    private User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));
    }

    private Car getCarById(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "해당 차량이 존재하지 않습니다."));
    }

    // 조회
    public List<CarInfoDto> getCarsByUserId(String userId) {
        List<Car> cars = carRepository.findByUserId(userId);

        return cars.stream()
                .map(car -> new CarInfoDto(car.getCarId(), car.getCarName(), car.getCarNumber()))
                .collect(Collectors.toList());
    }

    // 등록
    public CarDto addCarToUser(String userId, CarDto carDto) {
        User user = getUserById(userId);

        Car newCar = new Car();
        newCar.setCarName(carDto.getCarName());
        newCar.setCarNumber(carDto.getCarNumber());
        newCar.setUser(user);

        Car savedCar = carRepository.save(newCar);

        return new CarDto(savedCar.getCarName(), savedCar.getCarNumber());
    }

    // 수정
    public CarDto updateCar(Long carId, CarDto carDto) {
        Car existingCar = getCarById(carId);

        Optional.ofNullable(carDto.getCarName()).ifPresent(existingCar::setCarName);
        Optional.ofNullable(carDto.getCarNumber()).ifPresent(existingCar::setCarNumber);

        Car updatedCar = carRepository.save(existingCar);

        return new CarDto(updatedCar.getCarName(), updatedCar.getCarNumber());
    }

    // 삭제
    public void deleteCar(String userId, Long carId) {
        User user = getUserById(userId);
        Car car = getCarById(carId);

        if (!car.getUser().equals(user)) {
            throw new ApiException(ErrorCode.NULL_POINT, "유저와 차 정보가 일치하지 않습니다.");
        }

        carRepository.deleteById(carId);
    }
}
