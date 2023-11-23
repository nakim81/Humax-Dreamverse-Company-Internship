package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.BookInfoDTO;
import com.example.parking.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/user/{userId}/book")
    public ResponseEntity<Api<Object>> getBookList(
            @PathVariable("userId") Integer userId
    ){
        return ResponseEntity
                .status(200)
                .body(Api.OK(bookService.getBookList(userId)));
    }

    @PostMapping("/user/{userId}/book")
    public ResponseEntity<Api<Object>> addBook(
            @PathVariable("userId") Integer userId,
            @RequestBody BookInfoDTO bookInfoDTO
    ){
        bookService.addBook(userId, bookInfoDTO);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }

    @DeleteMapping("/user/{userId}/book/{bookId}")
    public ResponseEntity<Api<Object>> deleteBook(
            @PathVariable("userId") Integer userId,
            @PathVariable("bookId") Integer bookId
    ){
        bookService.deleteBook(userId, bookId);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }
}
