package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.ParkinglotDto;
import com.example.parking.entity.Parkinglot;
import com.example.parking.repository.AdminRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;
import com.example.parking.converter.ParkinglotConverter;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final ParkinglotConverter parkinglotConverter;

    @Autowired
    public AdminService(AdminRepository adminRepository, ParkinglotConverter parkinglotConverter) {
        this.adminRepository = adminRepository;
        this.parkinglotConverter = parkinglotConverter;
    }

    // 조회
    public List<ParkinglotDto> getAllParkingLots() {
        List<Parkinglot> parkinglots = adminRepository.findAll();

        return parkinglots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }

    // 개별 조회
    public ParkinglotDto getParkinglotById(Long parkingId) {
        Optional<Parkinglot> parkinglotOptional = adminRepository.findById(parkingId);
        return parkinglotOptional.map(parkinglotConverter::toDto)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 주차장입니다."));
    }

    //생성
    public ParkinglotDto createParkingLot(ParkinglotDto parkingLotDto) {
        Parkinglot parkingLot = parkinglotConverter.toEntity(parkingLotDto);
        Parkinglot savedParkingLot = adminRepository.save(parkingLot);
        return parkinglotConverter.toDto(savedParkingLot);
    }

    //수정
    public ParkinglotDto updateParkingLot(Long parkingId, ParkinglotDto parkinglotDto) {
        Optional<Parkinglot> existingParkingLotOptional = adminRepository.findById(parkingId);
        if (existingParkingLotOptional.isPresent()) {
            Parkinglot existingParkinglot = existingParkingLotOptional.get();
            parkinglotConverter.updateEntity(existingParkinglot, parkinglotDto);
            Parkinglot updateParkingLot = adminRepository.save(existingParkinglot);

            return parkinglotConverter.toDto(updateParkingLot);
        } else {
            throw new ApiException(ErrorCode.NULL_POINT, "주차장이 존재하지 않습니다.");
        }
    }

    //삭제
    public void deleteParkingLot(Long parkingId) {
        Optional<Parkinglot> existingParkingLotOptional = adminRepository.findById(parkingId);
        if (existingParkingLotOptional.isPresent()) {
            Parkinglot existingParkingLot = existingParkingLotOptional.get();
            existingParkingLot.setDeleteFlag(true);
            adminRepository.save(existingParkingLot);
        } else {
            throw new ApiException(ErrorCode.NULL_POINT, "주차장이 존재하지 않습니다.");
        }
    }

    //검색
    public List<ParkinglotDto> searchParkingByName(String name) {
        List<Parkinglot> parkinglots = adminRepository.findByNameContainingIgnoreCase(name);

        if (parkinglots.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "일치하는 주차장이 없습니다.");
        }

        return parkinglots.stream()
                .map(parkinglotConverter::toDto)
                .collect(Collectors.toList());
    }
}