package com.example.parking.repository;

import com.example.parking.entity.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface AdminRepository extends JpaRepository<Parkinglot, Long> {
    List<Parkinglot> findAll();
    List<Parkinglot> findByNameContainingIgnoreCase(String name);
}
