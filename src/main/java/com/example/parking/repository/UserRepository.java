package com.example.parking.repository;

import com.example.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsById(String id);
    boolean existsByPhoneNum(String phoneNum);
    boolean existsByEmail(String email);
}
