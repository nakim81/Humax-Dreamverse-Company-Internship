package com.example.parking.repository;

import com.example.parking.entity.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayRepository extends JpaRepository<Pay, Long> {
    List<Pay> findByUserUserId(Long userId);
}
