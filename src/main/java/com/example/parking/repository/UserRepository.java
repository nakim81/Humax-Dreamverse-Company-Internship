package com.example.parking.repository;

import com.example.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsById(String id);
    boolean existsByPhoneNum(String phoneNum);
    boolean existsByEmail(String email);
    Optional<User> findById(String id);
    @Query(value = "select u " +
            "from User u " +
            "left join fetch u.bookList " +
            "join fetch u.bookList.pay " +
            "join fetch u.bookList.car " +
            "join fetch u.bookList.parkinglot " +
            "where u.id=:id")
    public Optional<User> findByIDWithBookList(@Param("id") String id);
}
