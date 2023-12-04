package com.example.parking.converter;

import com.example.parking.common.annotation.Converter;
import com.example.parking.dto.UserDto;
import com.example.parking.entity.User;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public class UserConverter {
    public UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserId(user.getUserId());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNum(user.getPhoneNum());
        userDto.setAdmin(user.isAdmin());
        return userDto;
    }
}
