package com.example.parking.repository;

import com.example.parking.entity.Book;
import com.example.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select b from Book b left join fetch b.user where b.bookId=:bookId")
    public Optional<Book> findByIDWithUser(@Param("bookId") Integer bookId);
}
