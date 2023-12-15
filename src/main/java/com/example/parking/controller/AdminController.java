package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.dto.UserDto;
import com.example.parking.service.AdminService;
import com.example.parking.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;

    @Autowired
    public AdminController(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @GetMapping("/parkinglots")
    public ResponseEntity<List<ParkinglotDto>> getAllParkingLots() {
        List<ParkinglotDto> parkinglotDtos =  adminService.getAllParkingLots();
        return ResponseEntity.ok(parkinglotDtos);
    }

    @GetMapping("/parkinglots/{parkingId}")
    public ResponseEntity<ParkinglotDto> getParkinglotById(@PathVariable Long parkingId) {
        ParkinglotDto parkinglotDto = adminService.getParkinglotById(parkingId);
        return ResponseEntity.ok(parkinglotDto);
    }

    @PostMapping("/parkinglots")
    public ResponseEntity<ParkinglotDto> createPakringLot(@RequestBody ParkinglotDto parkinglotDto) {
        ParkinglotDto createParkingLot =  adminService.createParkingLot(parkinglotDto);
        return ResponseEntity.ok(createParkingLot);
    }

    @PatchMapping("/parkinglots/{parkingId}")
    public ResponseEntity<ParkinglotDto> updateParkingLot(@PathVariable Long parkingId, @RequestBody ParkinglotDto parkinglotDto) {
        ParkinglotDto updateParkingLot = adminService.updateParkingLot(parkingId, parkinglotDto);
        return ResponseEntity.ok(updateParkingLot);
    }

    @DeleteMapping("/parkinglots/{parkingId}")
    public ResponseEntity<Void> deleteParkingLot(@PathVariable Long parkingId) {
        adminService.deleteParkingLot(parkingId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/parkinglots/search")
    public ResponseEntity<List<ParkinglotDto>> searchParkingByName(@RequestParam String name) {
        List<ParkinglotDto> result = adminService.searchParkingByName(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<Void> addAdmin(@PathVariable String id) {
        adminService.addAdmin(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/withdraw/{id}")
    public Api<Object> withdrawUser(@PathVariable String id) {
        try {
            userService.withdrawUser(id);
            return Api.OK(null);
        } catch (Exception e) {
            e.printStackTrace();
            return Api.ERROR("회원 탈퇴 에러");
        }
    }
}
