package com.example.parking.repository;

import com.example.parking.entity.Parkinglot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.Optional;

public interface ParkingLotRepository extends JpaRepository<Parkinglot, Long> {

    Optional<Parkinglot> findByName(String name);

    @Query(value = "SELECT *, ST_Distance_Sphere(point(lon, lat), point(:longitude, :latitude)) as distance FROM parking_lot HAVING distance < :radius * 1000 ORDER BY distance LIMIT 15", nativeQuery = true)
    List<Parkinglot> findNearestParkingLots(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("radius") double radius);


    @Query(value = "SELECT p FROM Parkinglot p WHERE p.name LIKE CONCAT('%', :keyword, '%') OR p.address LIKE CONCAT('%', :keyword, '%')")
    Page<Parkinglot> findByNameOrAddressContains(@Param("keyword") String keyword, Pageable pageable);

}
