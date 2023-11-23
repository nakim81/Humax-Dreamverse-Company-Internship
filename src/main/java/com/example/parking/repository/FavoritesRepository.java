package com.example.parking.repository;

import com.example.parking.entity.Car;
import com.example.parking.entity.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {
    List<Favorites> findByUserUserId(Integer userId);

}
