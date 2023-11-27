package com.example.parking.service;

import com.example.parking.common.error.UserErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.UserDto;
import com.example.parking.entity.User;
import com.example.parking.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(UserDto userDto) {
        // userRepository 주입 확인
        if (userRepository == null) {
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }

        validateDuplicateId(userDto.getId());
        validateDuplicatePhoneNum(userDto.getPhoneNum());
        validateDuplicateEmail(userDto.getEmail());

        // user 엔티티로 변환
        User user = User.builder()
                .id(userDto.getId())
                .password(passwordEncoder.encode(userDto.getPassword())) // 비밀번호 암호화
                .phoneNum(userDto.getPhoneNum())
                .email(userDto.getEmail())
                .admin(userDto.isAdmin())
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
            // userRepository null 경우의 예외 처리
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }
    }

    private void validateDuplicatePhoneNum(String phoneNum) {
        if (userRepository != null) {
            // 중복된 전화번호가 존재하는지 확인
            if (userRepository.existsByPhoneNum(phoneNum)) {
                throw new ApiException(UserErrorCode.DUPLICATE_PHONENUM, "이미 사용 중인 전화번호입니다.");
            }
        } else {
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }
    }

    private void validateDuplicateEmail(String email) {
        if (userRepository != null) {
            // 중복된 이메일이 존재하는지 확인
            if (userRepository.existsByEmail(email)) {
                throw new ApiException(UserErrorCode.DUPLICATE_EMAIL, "이미 사용 중인 이메일입니다.");
            }
        } else {
            throw new ApiException(UserErrorCode.USER_REPOSITORY_NOT_INITIALIZED, "UserRepository가 초기화되지 않았습니다.");
        }
    }


    public User validateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return user;
    }
    public UserDto getUserInfo(String username) {
        // id 기반으로 사용자 정보를 조회
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // UserDto로 변환
        return UserDto.builder()
                .id(user.getId())
                .phoneNum(user.getPhoneNum())
                .email(user.getEmail())
                .build();
    }
    public void updateUserProfile(String userId, UserDto updateUserDto) {
        // 사용자 정보 가져오기
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 요청에서 null이 아닌 값만
        if (updateUserDto.getPhoneNum() != null) {
            existingUser.setPhoneNum(updateUserDto.getPhoneNum());
        }

        if (updateUserDto.getEmail() != null) {
            existingUser.setEmail(updateUserDto.getEmail());
        }

        // 업데이트된 사용자 정보 저장
        userRepository.save(existingUser);
    }

    public void withdrawUser(String userId) {
        // 사용자 정보 삭제
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(existingUser);
    }
}
