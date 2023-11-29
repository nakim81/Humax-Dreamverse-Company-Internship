package com.example.parking.repository;

import com.example.parking.common.enums.BookState;
import com.example.parking.entity.Book;
import com.example.parking.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "select b from Book b left join fetch b.user where b.bookId=:bookId")
    public Optional<Book> findByIDWithUser(@Param("bookId") Long bookId);

    @Query(value = "select b from Book b where b.state=:state and b.startTime<=:currentTime")
    public List<Book> findChangeToUsing(@Param("state")BookState state,
                                        @Param("currentTime")LocalDateTime currentTime);

    @Query(value = "select b from Book b where b.state=:state and b.endTime<=:currentTime")
    public List<Book> findChangeToFinish(@Param("state")BookState state,
                                         @Param("currentTime")LocalDateTime currentTime);

    @Query(value = "select b " +
            "from Book b " +
            "join fetch b.pay " +
            "join fetch b.car " +
            "join fetch b.parkinglot " +
            "where b.user.id=:id " +
            "order by b.endTime desc")
    public Page<Book> findByUserId(@Param("id") String id, Pageable pageable);
}
