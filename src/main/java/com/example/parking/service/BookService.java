package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.BookDTO;
import com.example.parking.entity.*;
import com.example.parking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public List<BookDTO> getBookList(Long userId){

        Optional<User> optionalUser = userRepository.findByIDWithBookList(userId);

        if(optionalUser.isPresent()) {
            List<BookDTO> bookDTOS = new ArrayList<>();
            for(Book book: optionalUser.get().getBookList())
                bookDTOS.add(new BookDTO(book));
            return bookDTOS;
        }
        throw new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다.");
    }

    public void addBook(Integer userId, BookDTO bookDTO){

        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Parkinglot> optionalParkinglot = parkingLotRepository.findById(bookDTO.getBookId());
        Optional<Car> optionalCar = carRepository.findById(bookDTO.getCarId());
        Optional<Pay> optionalPay = payRepository.findById(bookDTO.getPayId());

        if(optionalUser.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다.");
        }
        else if(optionalParkinglot.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "주차장 정보가 존재하지 않습니다.");
        }
        else if(optionalCar.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "차 정보가 존재하지 않습니다.");
        }
        else if(optionalPay.isEmpty()){
            throw new ApiException(ErrorCode.NULL_POINT, "결제 정보가 존재하지 않습니다.");
        }
        else{
            Book book = new Book(bookDTO.getState(),
                    bookDTO.getStartTime(),
                    bookDTO.getEndTime(),
                    bookDTO.getPrice(),
                    bookDTO.getTicket(),
                    optionalUser.get(),
                    optionalParkinglot.get(),
                    optionalCar.get(),
                    optionalPay.get());
            bookRepository.save(book);
        }
    }

    public void deleteBook(Integer userId, Integer bookId){

        Optional<Book> optionalBook = bookRepository.findByIDWithUser(bookId);

        if(optionalBook.isPresent()) {
            if(Objects.equals(optionalBook.get().getUser().getUserId(), userId))
                bookRepository.delete(optionalBook.get());
            else
                throw new ApiException(ErrorCode.BAD_REQUEST, "해당 사용자의 예약 내역이 아닙니다.");
        }else {
            throw new ApiException(ErrorCode.NULL_POINT, "예약 정보가 존재하지 않습니다.");
        }
    }
}
