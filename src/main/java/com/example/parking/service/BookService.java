package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.BookInfoDTO;
import com.example.parking.entity.Book;
import com.example.parking.entity.User;
import com.example.parking.repository.BookRepository;
import com.example.parking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service @RequiredArgsConstructor
public class BookService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public List<BookInfoDTO> getBookList(Integer userId){
        Optional<User> optionalUser = userRepository.findByIDWithBookList(userId);
        if(optionalUser.isPresent()) {
            List<BookInfoDTO> bookInfoDTOS = new ArrayList<>();
            for(Book book: optionalUser.get().getBookList())
                bookInfoDTOS.add(new BookInfoDTO(book));
            return bookInfoDTOS;
        }
        throw new ApiException(ErrorCode.NULL_POINT, "사용자 정보가 존재하지 않습니다.");
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
