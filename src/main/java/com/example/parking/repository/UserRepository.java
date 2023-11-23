package com.example.parking.repository;

import com.example.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "select u from User u left join fetch u.bookList where u.userId=:userId")
    public Optional<User> findByIDWithBookList(@Param("userId") Integer userId);
}
