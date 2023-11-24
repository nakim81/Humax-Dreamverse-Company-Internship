package com.example.parking.controller;


import com.example.parking.dto.FavoritesDto;
import com.example.parking.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/{userId}/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    @Autowired
    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }


    /*
     * 즐겨찾기 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<FavoritesDto>> getFavoritesByUserId(@PathVariable Long userId) throws Exception {

        // TODO : 토큰 유효성 검증





        List<FavoritesDto> favoritesDtos = favoritesService.getFavoritesByUserId(userId);

        return new ResponseEntity<List<FavoritesDto>>(favoritesDtos,
                HttpStatus.OK);
    }



    /*
     * 즐겨찾기 등록
     */
    @PostMapping
    public ResponseEntity<FavoritesDto> registerFavoritesInfo(@PathVariable Long userId,
                                                              @RequestBody FavoritesDto favoritesDto) throws Exception {

        // TODO : 토큰 유효성 검증





        favoritesService.registerFavoritesInfo(userId, favoritesDto);

        return new ResponseEntity<FavoritesDto>(favoritesDto,
                HttpStatus.OK);

    }

    @DeleteMapping("/{favoritesId}")
    public ResponseEntity<FavoritesDto> deleteFavoritesInfo(@PathVariable Long userId,
                                                            @PathVariable String favoritesId) throws Exception {

        // TODO : 토큰 유효성 검증




        FavoritesDto deletedData = favoritesService.deleteFavoritesInfo(Long.parseLong(favoritesId));

        return new ResponseEntity<FavoritesDto>(deletedData,
                HttpStatus.OK);

    }
    
}
