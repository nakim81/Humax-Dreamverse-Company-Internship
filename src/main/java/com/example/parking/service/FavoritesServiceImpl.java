package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.FavoritesDto;
import com.example.parking.entity.Favorites;
import com.example.parking.entity.Parkinglot;
import com.example.parking.entity.User;
import com.example.parking.repository.FavoritesRepository;
import com.example.parking.repository.ParkingLotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoritesServiceImpl implements FavoritesService{

    private final FavoritesRepository favoritesRepository;
    private final ParkingLotRepository parkingLotRepository;

    @Autowired
    public FavoritesServiceImpl(FavoritesRepository favoritesRepository,
                                ParkingLotRepository parkingLotRepository) {
        this.favoritesRepository = favoritesRepository;
        this.parkingLotRepository = parkingLotRepository;
    }
    
    /*
     * 즐겨 찾기 ID로 조회
     */
    @Override
    public FavoritesDto getFavoritesById(Integer favoritesId) throws Exception {

        Favorites favorites = favoritesRepository.getReferenceById(favoritesId);

        return FavoritesDto.of(favorites);
    }


    /*
     * 유저 ID로 즐겨 찾기 조회
     */
    @Override
    public List<FavoritesDto> getFavoritesByUserId(Integer userId) throws Exception {

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
    public void registerFavoritesInfo(Integer userId, FavoritesDto favoritesDto) throws Exception {

        Favorites favorites = new Favorites();

        Parkinglot parkinglot = parkingLotRepository
                .findByName(favoritesDto.getFavorites_name())
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 주차장 정보입니다."));


/*

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));

*/

        // (기능 구현 완료 시 삭제)
        // TEST: 더미 유저 대입 후 밀어 넣기
        // =====================================================================
        User dummy = User.builder()
                .id("ksw")
                .email("n@gmail.com")
                .password("1234")
                .phoneNum(1012345678).build();
        dummy.setUserId(1);
        // =====================================================================


        favorites.setParkinglot(parkinglot);
        favorites.setUser(dummy);

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
    public FavoritesDto deleteFavoritesInfo(Integer favoritesId) throws Exception {

        Favorites favorites = favoritesRepository
                .findById(favoritesId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "즐겨찾기 정보가 없습니다."));

        favoritesRepository.deleteById(favoritesId);

        return FavoritesDto.of(favorites);
    }
}
