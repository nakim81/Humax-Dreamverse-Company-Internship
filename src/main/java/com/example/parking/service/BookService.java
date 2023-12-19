package com.example.parking.service;

import com.example.parking.common.enums.BookState;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.AddBookDTO;
import com.example.parking.dto.BookDTO;
import com.example.parking.dto.OutDTO;
import com.example.parking.entity.*;
import com.example.parking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Objects;
import java.util.Optional;

@Service @RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final CarRepository carRepository;
    private final PayRepository payRepository;

    // 나중에 필터 종류 늘어나면 jpql 이용한 동적 쿼리로 변경
    public Page<BookDTO> getBookList(String userId, BookState state, Integer page){
        if(state == null)
            return bookRepository.findByUserId(userId, PageRequest.of(page, 4)).map(BookDTO::new);
        return bookRepository.findByUserIdAndState(userId, state, PageRequest.of(page, 4)).map(BookDTO::new);
    }

    public void addBook(String userId, AddBookDTO addBookDTO){
        verifyDate(addBookDTO.getStartTime(), addBookDTO.getEndTime());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다."));
        Parkinglot parkingLot = parkingLotRepository.findById(addBookDTO.getParkingLotId())
                .orElseThrow(()-> new ApiException(ErrorCode.NULL_POINT, "주차장 정보가 존재하지 않습니다."));
        Car car = carRepository.findById(addBookDTO.getCarId())
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "차 정보가 존재하지 않습니다."));
        Pay pay = payRepository.findById(addBookDTO.getPayId())
                .orElseThrow(()->  new ApiException(ErrorCode.NULL_POINT, "결제 정보가 존재하지 않습니다."));
        verifyBook(car.getCarNumber(), parkingLot.getName(), addBookDTO.getStartTime());

        Book book = new Book(
                BookState.READY_TO_USE,
                addBookDTO.getStartTime(),
                addBookDTO.getEndTime(),
                addBookDTO.getPrice(),
                addBookDTO.getTicket(),
                car.getCarNumber(),
                pay.getPayType()+" "+pay.getPayName()+" "+pay.getPayNumber(),
                parkingLot.getName(),
                user, parkingLot
        );
        bookRepository.save(book);
    }

    public void verifyDate(LocalDateTime startDate, LocalDateTime endDate){
        if(startDate.isAfter(endDate))
            throw new ApiException(ErrorCode.BAD_REQUEST, "시작 시간은 끝 시간보다 빨라야합니다.");

        if(!startDate.toLocalDate().equals(endDate.toLocalDate()))
            throw new ApiException(ErrorCode.BAD_REQUEST, "시작 시간과 끝 시간의 날짜가 같아야합니다.");

        LocalDate cur_date = LocalDate.now();
        if(startDate.toLocalDate().isBefore(cur_date) || Period.between(cur_date, startDate.toLocalDate()).getDays() >= 7)
            throw new ApiException(ErrorCode.BAD_REQUEST, "예약 기간이 아닙니다.");
    }

    public void verifyBook(String carNumber, String parkingLotName, LocalDateTime startTime){
        Optional<Book> optionalBook = bookRepository.findSameBook(carNumber, parkingLotName, startTime.toLocalDate());
        if(optionalBook.isPresent())
            throw new ApiException(ErrorCode.BAD_REQUEST, "이미 예약이 존재합니다.");
    }

    public void cancelBook(String userId, Long bookId){
        Book book = bookRepository.findByIDWithUser(bookId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "예약 정보가 존재하지 않습니다."));

        if(!Objects.equals(book.getUser().getId(), userId))
            throw new ApiException(ErrorCode.BAD_REQUEST, "해당 사용자의 예약 내역이 아닙니다.");
        else if(book.getState()==BookState.CANCELED)
            throw new ApiException(ErrorCode.BAD_REQUEST, "이미 취소된 내역입니다.");
        else if(book.getState()==BookState.USED)
            throw  new ApiException(ErrorCode.BAD_REQUEST, "이미 사용된 내역입니다.");
        else if(LocalDateTime.now().isAfter(book.getEndTime()))
            throw new ApiException(ErrorCode.BAD_REQUEST, "사용 기간을 초과하였습니다.");

        book.setState(BookState.CANCELED);
        bookRepository.save(book);
    }

    public void enter(String userId, String carNumber, String parkingLotName){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다."));
        if(!user.isAdmin())
            throw new ApiException(ErrorCode.INVALID_TOKEN, "admin 사용자가 아닙니다.");

        Book book = bookRepository.findBookToUse(carNumber, parkingLotName, LocalDateTime.now())
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "예약 정보가 존재하지 않습니다."));

        book.setState(BookState.USED);
        book.setEnterTime(LocalDateTime.now());
        bookRepository.save(book);
    }

    public OutDTO out(String userId, String carNumber, String parkingLotName){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다."));
        if(!user.isAdmin())
            throw new ApiException(ErrorCode.INVALID_TOKEN, "admin 사용자가 아닙니다.");

        Book book = bookRepository.findBookToOut(carNumber, parkingLotName)
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_REQUEST, "예약 정보가 존재하지 않습니다."));

        book.setOutTime(LocalDateTime.now());
        bookRepository.save(book);

        return new OutDTO(book.getEnterTime(), book.getPrice());
    }
}
