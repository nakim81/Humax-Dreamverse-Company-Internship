package com.example.parking.repository;

import com.example.parking.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select b from Book b left join fetch b.user where b.bookId=:bookId")
    public Optional<Book> findByIDWithUser(@Param("bookId") Integer bookId);

    @Query(value = "select b from Book b where b.state='이용대기' and b.startTime<=:currentTime")
    public List<Book> findChangeStateToUsing(@Param("currentTime")LocalDateTime currentTime);

    @Query(value = "select b from Book b where b.state='이용중' and b.endTime<=:currentTime")
    public List<Book> findChangeStateToFinish(@Param("currentTime")LocalDateTime currentTime);
}
