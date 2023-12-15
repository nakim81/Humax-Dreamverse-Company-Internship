package com.example.parking.service;

import com.example.parking.dto.FavoritesDto;

import java.util.List;

public interface FavoritesService {

    FavoritesDto getFavoritesById(Long favoritesId) throws Exception;

    List<FavoritesDto> getFavoritesByUserId(Long userId) throws Exception;

    FavoritesDto registerFavoritesInfo(Long userId, FavoritesDto favoritesDto) throws Exception;

    FavoritesDto deleteFavoritesInfo(Long favoritesId) throws Exception;

}
