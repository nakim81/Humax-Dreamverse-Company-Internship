package com.example.parking.repository;

import com.example.parking.entity.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParkingLotRepository extends JpaRepository<Parkinglot, String> {
    public Optional<Parkinglot> findByName(String name);
}
