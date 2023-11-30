package com.example.parking.scheduler;

import com.example.parking.common.enums.BookState;
import com.example.parking.entity.Book;
import com.example.parking.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j @Component
@RequiredArgsConstructor
public class BookStateScheduler {
    private final BookRepository bookRepository;

    @Transactional
    @Scheduled(cron = "0 0 0/1 * * *")
    public void changeBookState(){
        log.info("예약 상태 변경 스케줄러 작동");

        LocalDateTime currentTime = LocalDateTime.now();

        List<Book> toFinishList = bookRepository.findChangeToFinish(BookState.READY_TO_USE, currentTime);
        for(Book book: toFinishList)
            book.setState(BookState.NO_USE);
        bookRepository.saveAll(toFinishList);

        log.info("예약 상태 변경 스케줄러 작동 완료");
    }
}
