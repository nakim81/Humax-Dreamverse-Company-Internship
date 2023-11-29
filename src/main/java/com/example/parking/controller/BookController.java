package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.AddBookDTO;
import com.example.parking.dto.BookDTO;
import com.example.parking.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController @RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/user/book")
    public ResponseEntity<Api<Object>> getBookList(
            @RequestParam(name="page") Integer page
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        return ResponseEntity
                .status(200)
                .body(Api.OK(bookService.getBookList(userId, page)));
    }

    @PostMapping("/user/book")
    public ResponseEntity<Api<Object>> addBook(
            @RequestBody AddBookDTO addBookDTO
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        bookService.addBook(userId, addBookDTO);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }

    @PatchMapping("/user/book/cancel/{bookId}")
    public ResponseEntity<Api<Object>> cancelBook(
            @PathVariable("bookId") Long bookId
    ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        bookService.cancelBook(userId, bookId);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }
}
