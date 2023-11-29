package com.example.parking.service;

import com.example.parking.common.enums.BookState;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.AddBookDTO;
import com.example.parking.dto.BookDTO;
import com.example.parking.entity.*;
import com.example.parking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service @RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final CarRepository carRepository;
    private final PayRepository payRepository;

    public List<BookDTO> getBookList(String userId){

        Optional<User> optionalUser = userRepository.findByIDWithBookList(userId);

        if(optionalUser.isPresent()) {
            List<BookDTO> getBookDTOS = new ArrayList<>();
            for(Book book: optionalUser.get().getBookList())
                getBookDTOS.add(new BookDTO(book));
            return getBookDTOS;
        }
        throw new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다.");
    }

    public void addBook(String userId, AddBookDTO addBookDTO){

        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Parkinglot> optionalParkingLot = parkingLotRepository.findById(addBookDTO.getParkingLotId());
        Optional<Car> optionalCar = carRepository.findById(addBookDTO.getCarId());
        Optional<Pay> optionalPay = payRepository.findById(addBookDTO.getPayId());

        if(optionalUser.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다.");
        }
        else if(optionalParkingLot.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "주차장 정보가 존재하지 않습니다.");
        }
        else if(optionalCar.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "차 정보가 존재하지 않습니다.");
        }
        else if(optionalPay.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "결제 정보가 존재하지 않습니다.");
        }
        else{
            Book book = new Book(BookState.READY_TO_USE,
                    addBookDTO.getStartTime(),
                    addBookDTO.getEndTime(),
                    addBookDTO.getPrice(),
                    addBookDTO.getTicket(),
                    optionalUser.get(),
                    optionalParkingLot.get(),
                    optionalCar.get(),
                    optionalPay.get());
            bookRepository.save(book);
        }
    }

    public void cancelBook(String userId, Long bookId){

        Optional<Book> optionalBook = bookRepository.findByIDWithUser(bookId);

        if(optionalBook.isPresent()) {
            Book book = optionalBook.get();
            if(!Objects.equals(book.getUser().getId(), userId))
                throw new ApiException(ErrorCode.BAD_REQUEST, "해당 사용자의 예약 내역이 아닙니다.");
            else if(book.getState()==BookState.CANCELED)
                throw new ApiException(ErrorCode.BAD_REQUEST, "이미 취소된 내역입니다.");
            else if(LocalDateTime.now().isAfter(book.getStartTime()))
                throw new ApiException(ErrorCode.BAD_REQUEST, "예약 취소 기간이 아닙니다.");
            else{
                book.setState(BookState.CANCELED);
                bookRepository.save(book);
            }

        }else {
            throw new ApiException(ErrorCode.NULL_POINT, "예약 정보가 존재하지 않습니다.");
        }
    }
}
