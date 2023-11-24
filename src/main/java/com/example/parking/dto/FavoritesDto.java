package com.example.parking.dto;


import com.example.parking.entity.Favorites;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FavoritesDto {

    private  Integer favorites_id;

    private String favorites_name;

    private String code_number;

    public static FavoritesDto of(Favorites favoritesEntity) {

        return new FavoritesDto(
                favoritesEntity.getLikeId(),
                favoritesEntity.getParkinglot().getName(),
                favoritesEntity.getParkinglot().getCodeNumber()
        );

    }

}
