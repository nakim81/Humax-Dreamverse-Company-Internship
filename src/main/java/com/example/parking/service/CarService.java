package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.CarDto;
import com.example.parking.dto.CarInfo;
import com.example.parking.entity.Car;
import com.example.parking.entity.User;
import com.example.parking.repository.CarRepository;
import com.example.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    // 조회
    public List<CarInfo> getCarsByUserId(Integer userId) {
        List<Car> cars = carRepository.findByUserUserId(userId);

        if (!cars.isEmpty()) {
            return cars.stream()
                    .map(car -> new CarInfo(car.getCarId(), car.getCarName(), car.getCarNumber()))
                    .collect(Collectors.toList());
        } else {
            throw new ApiException(ErrorCode.NULL_POINT, "차량을 등록해주세요.");
        }
    }

    // 등록
    public CarDto addCarToUser(Integer userId, CarDto carDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));

        Car newCar = new Car();
        newCar.setCarName(carDto.getCarName());
        newCar.setCarNumber(carDto.getCarNumber());
        newCar.setUser(user);

        Car savedCar = carRepository.save(newCar);

        return new CarDto(savedCar.getCarName(), savedCar.getCarNumber());
    }

    // 수정
    public CarDto updateCar(Integer carId, CarDto carDto) {
        Car existingCar = carRepository.findById(carId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "해당 차량이 존재하지 않습니다."));

        if (carDto.getCarName() != null) {
            existingCar.setCarName(carDto.getCarName());
        }

        if (carDto.getCarNumber() != null) {
            existingCar.setCarNumber(carDto.getCarNumber());
        }

        Car updatedCar = carRepository.save(existingCar);

        return new CarDto(updatedCar.getCarName(), updatedCar.getCarNumber());
    }

    // 삭제
    public void deleteCar(Integer userId, Integer carId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "해당 차량이 존재하지 않습니다."));

        if (!car.getUser().equals(user)) {
            throw new ApiException(ErrorCode.NULL_POINT, "유저와 차 정보가 일치하지 않습니다.");
        }

        carRepository.deleteById(carId);
    }
}
