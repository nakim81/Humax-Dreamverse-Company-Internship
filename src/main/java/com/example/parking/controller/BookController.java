package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.AddBookDTO;
import com.example.parking.dto.EntranceDTO;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/user/book")
    public ResponseEntity<Api<Object>> getBookList(
            @RequestParam(name="page") Integer page,
            @RequestHeader("Authorization") String AccessToken
    ){
        String token = AccessToken.split(" ")[1];
        if(token == null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        String userId = jwtTokenProvider.getUsername(token);

        return ResponseEntity
                .status(200)
                .body(Api.OK(bookService.getBookList(userId, page)));
    }

    @PostMapping("/user/book")
    public ResponseEntity<Api<Object>> addBook(
            @RequestBody AddBookDTO addBookDTO,
            @RequestHeader("Authorization") String AccessToken
    ){
        String token = AccessToken.split(" ")[1];
        if(token == null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        String userId = jwtTokenProvider.getUsername(token);

        bookService.addBook(userId, addBookDTO);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }

    @PatchMapping("/user/book/cancel/{bookId}")
    public ResponseEntity<Api<Object>> cancelBook(
            @PathVariable("bookId") Long bookId,
            @RequestHeader("Authorization") String AccessToken
    ){
        String token = AccessToken.split(" ")[1];
        if(token == null || !jwtTokenProvider.validateToken(token))
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        String userId = jwtTokenProvider.getUsername(token);

        bookService.cancelBook(userId, bookId);
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }

    @PatchMapping("/book/entrance")
    public ResponseEntity<Api<Object>> entrance(
            @RequestBody EntranceDTO entranceDTO
    ){
        bookService.entrance(entranceDTO.getCarNumber(), entranceDTO.getParkingLotName());
        return ResponseEntity
                .status(200)
                .body(Api.OK(null));
    }
}
