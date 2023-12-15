package com.example.parking.controller;


import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.FavoritesDto;
import com.example.parking.entity.User;
import com.example.parking.repository.UserRepository;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Autowired
    public FavoritesController(FavoritesService favoritesService,
                               JwtTokenProvider jwtTokenProvider,
                               UserRepository userRepository) {
        this.favoritesService = favoritesService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }


    /*
     * 즐겨찾기 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<FavoritesDto>> getFavoritesByUserId(@RequestHeader("Authorization") String requestAccessToken) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }

        List<FavoritesDto> favoritesDtos = favoritesService.getFavoritesByUserId(user.get().getUserId());

        return new ResponseEntity<List<FavoritesDto>>(favoritesDtos,
                HttpStatus.OK);
    }



    /*
     * 즐겨찾기 등록
     */
    @PostMapping
    public ResponseEntity<FavoritesDto> registerFavoritesInfo(@RequestHeader("Authorization") String requestAccessToken,
                                                              @RequestBody FavoritesDto favoritesDto) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }

        FavoritesDto registeredFavoritesDto = favoritesService.registerFavoritesInfo(user.get().getUserId(), favoritesDto);

        return new ResponseEntity<FavoritesDto>(registeredFavoritesDto,
                HttpStatus.OK);

    }

    @DeleteMapping("/{favoritesId}")
    public ResponseEntity<FavoritesDto> deleteFavoritesInfo(@RequestHeader("Authorization") String requestAccessToken,
                                                            @PathVariable String favoritesId) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }

        FavoritesDto deletedData = favoritesService.deleteFavoritesInfo(Long.parseLong(favoritesId));

        return new ResponseEntity<FavoritesDto>(deletedData,
                HttpStatus.OK);

    }
    
}
