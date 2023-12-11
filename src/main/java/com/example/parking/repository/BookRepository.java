package com.example.parking.repository;

import com.example.parking.common.enums.BookState;
import com.example.parking.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "select b from Book b " +
            "left join fetch b.user " +
            "where b.bookId=:bookId")
    public Optional<Book> findByIDWithUser(@Param("bookId") Long bookId);

    @Query(value = "select b from Book b " +
            "left join fetch b.parkinglot " +
            "where b.user.id=:id " +
            "order by b.endTime desc")
    public Page<Book> findByUserId(@Param("id") String id, Pageable pageable);

    @Query(value = "select b from Book b " +
            "where b.carNumber=:carNumber " +
            "and b.parkingLotName=:parkingLotName " +
            "and date_format(b.startTime, '%Y-%m-%d')=:currentDate " +
            "and b.state='1'")
    public Optional<Book> findSameBook(
            @Param("carNumber")String carNumber,
            @Param("parkingLotName")String parkingLotName,
            @Param("currentDate") LocalDate currentDate
    );

    @Query(value = "select b from Book b " +
            "where b.carNumber=:carNumber " +
            "and b.parkingLotName=:parkingLotName " +
            "and :currentTime between b.startTime and b.endTime " +
            "and b.state='1'")
    public Optional<Book> findBookToUse(
            @Param("carNumber")String carNumber,
            @Param("parkingLotName")String parkingLotName,
            @Param("currentTime")LocalDateTime currentTime
    );

    @Query(value = "select b from Book b " +
            "where b.state=:state " +
            "and b.endTime<=:currentTime")
    public List<Book> findChangeToFinish(
            @Param("state")BookState state,
            @Param("currentTime")LocalDateTime currentTime
    );
}
