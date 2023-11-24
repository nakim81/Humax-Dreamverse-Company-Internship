package com.example.parking.service;

import com.example.parking.dto.FavoritesDto;

import java.util.List;

public interface FavoritesService {

    FavoritesDto getFavoritesById(Integer favoritesId) throws Exception;

    List<FavoritesDto> getFavoritesByUserId(Integer userId) throws Exception;

    void registerFavoritesInfo(Integer userId, FavoritesDto favoritesDto) throws Exception;

    FavoritesDto deleteFavoritesInfo(Integer favoritesId) throws Exception;

}
