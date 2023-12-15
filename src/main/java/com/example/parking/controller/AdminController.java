package com.example.parking.controller;

import com.example.parking.dto.ParkinglotDto;
import com.example.parking.dto.UserDto;
import com.example.parking.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
}
