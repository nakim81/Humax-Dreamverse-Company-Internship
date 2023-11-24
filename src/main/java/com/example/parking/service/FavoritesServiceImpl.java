package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.FavoritesDto;
import com.example.parking.entity.Favorites;
import com.example.parking.entity.Parkinglot;
import com.example.parking.entity.User;
import com.example.parking.repository.FavoritesRepository;
import com.example.parking.repository.ParkingLotRepository;
import com.example.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoritesServiceImpl implements FavoritesService{

    private final FavoritesRepository favoritesRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final UserRepository userRepository;

    @Autowired
    public FavoritesServiceImpl(FavoritesRepository favoritesRepository,
                                ParkingLotRepository parkingLotRepository,
                                UserRepository userRepository) {
        this.favoritesRepository = favoritesRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.userRepository = userRepository;
    }
    
    /*
     * 즐겨 찾기 ID로 조회
     */
    @Override
    public FavoritesDto getFavoritesById(Long favoritesId) throws Exception {

        Favorites favorites = favoritesRepository.getReferenceById(favoritesId);

        return FavoritesDto.of(favorites);
    }


    /*
     * 유저 ID로 즐겨 찾기 조회
     */
    @Override
    public List<FavoritesDto> getFavoritesByUserId(Long userId) throws Exception {

        List<Favorites> favoritesList = favoritesRepository.findByUserUserId(userId);
        List<FavoritesDto> results = new ArrayList<>();

        if(!favoritesList.isEmpty()) {
            for(Favorites favorites : favoritesList) {
                results.add(FavoritesDto.of(favorites));
            }
        }
        else {
            throw new ApiException(ErrorCode.NULL_POINT, "등록된 즐겨찾기가 없습니다.");
        }

        return results;
    }



    /*
     * 즐겨찾기 정보 등록
     */
    @Override
    public void registerFavoritesInfo(Long userId, FavoritesDto favoritesDto) throws Exception {

        Favorites favorites = new Favorites();

        Parkinglot parkinglot = parkingLotRepository
                .findByName(favoritesDto.getFavorites_name())
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 주차장 정보입니다."));


        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));


        favorites.setParkinglot(parkinglot);
        favorites.setUser(user);

        try {
            favoritesRepository.save(favorites);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }


    }


    /*
     * 즐겨찾기 정보 삭제
     */
    @Override
    public FavoritesDto deleteFavoritesInfo(Long favoritesId) throws Exception {

        Favorites favorites = favoritesRepository
                .findById(favoritesId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "즐겨찾기 정보가 없습니다."));

        favoritesRepository.deleteById(favoritesId);

        return FavoritesDto.of(favorites);
    }
}
