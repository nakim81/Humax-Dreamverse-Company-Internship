package com.example.parking.repository;

import com.example.parking.entity.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingLotRepository extends JpaRepository<Parkinglot, String> {
}
