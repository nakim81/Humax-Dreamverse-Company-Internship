package com.example.parking.repository;

import com.example.parking.entity.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkingLotRepository extends JpaRepository<Parkinglot, String> {
    @Query(value = "SELECT *, ( 6371 * acos( cos( radians(:latitude) ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(:longitude) ) + sin( radians(:latitude) ) * sin(radians(lat)) ) ) AS distance FROM parking_lot HAVING distance < 25 ORDER BY distance LIMIT 0 , 15", nativeQuery = true)
    List<Parkinglot> findNearestParkingLots(@Param("latitude") double latitude, @Param("longitude") double longitude);

    @Query(value = "SELECT p FROM Parkinglot p WHERE p.name LIKE CONCAT('%', :keyword, '%') OR p.address LIKE CONCAT('%', :keyword, '%')")
    List<Parkinglot> findByNameOrAddressContains(@Param("keyword") String keyword);


}
