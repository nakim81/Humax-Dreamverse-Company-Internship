package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/user/{userId}/book")
    public ResponseEntity<Api<Object>> getBookList(@PathVariable("userId") Integer userId){
        return ResponseEntity
                .status(200)
                .body(
                        Api.OK(bookService.getBookList(userId))
                );
    }
}
