package com.example.parking.repository;

import com.example.parking.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByUserUserId(Long user_id);
}
