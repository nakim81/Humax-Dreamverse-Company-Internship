package com.example.parking.repository;

import com.example.parking.entity.SearchHistory;
import com.example.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Integer> {
    List<SearchHistory> findByUserOrderByHistoryIdDesc(User user);
}
