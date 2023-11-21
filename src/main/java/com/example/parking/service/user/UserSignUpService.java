package com.example.parking.service.user;

import com.example.parking.common.error.UserErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.user.UserSignUpDto;
import com.example.parking.entity.User;
import com.example.parking.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSignUpService {
    private final UserRepository userRepository;

    public UserSignUpService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signUp(UserSignUpDto userSignUpDto) {
        // userRepository 주입 확인
        if (userRepository == null) {
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }

        validateDuplicateId(userSignUpDto.getId());

        // user 엔티티로 변환
        User user = User.builder()
                .id(userSignUpDto.getId())
                .password(userSignUpDto.getPassword())
                .phoneNum(userSignUpDto.getPhoneNum())
                .email(userSignUpDto.getEmail())
                .build();

        userRepository.save(user);
    }

    private void validateDuplicateId(String id) {
        // null 체크
        if (userRepository != null) {
            // 중복된 아이디가 존재하는지 확인
            if (userRepository.existsById(id)) {
                throw new ApiException(UserErrorCode.DUPLICATE_ID, "이미 사용 중인 아이디입니다.");
            }
        } else {
            // userRepository가 null인 경우의 예외 처리
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }
    }
}
