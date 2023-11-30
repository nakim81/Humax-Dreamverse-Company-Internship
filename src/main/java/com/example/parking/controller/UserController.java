package com.example.parking.controller;

import com.example.parking.common.api.Api;
import com.example.parking.dto.UserDto;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final StringRedisTemplate redisTemplate;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager, StringRedisTemplate redisTemplate) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/sign-up")
    public Api<Object> signUp(@Validated @RequestBody UserDto userDto){
        userService.signUp(userDto);
        return Api.OK(null);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@Valid @RequestBody UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.getId(),
                        userDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.createToken(userDto.getId());

        // UserDto 찾기
        UserDto loggedInUser = userService.findByUserId(userDto.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("userId", loggedInUser.getUserId());

        return ResponseEntity.ok(response);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = jwtTokenProvider.resolveToken(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰을 Redis에 저장하여 블랙리스트로 관리
            redisTemplate.opsForValue().set(token, "logout", jwtTokenProvider.getRemainingSeconds(token), TimeUnit.SECONDS);
            return ResponseEntity.ok("Logout successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
    @GetMapping("/mypage")
    public Api<Object> getMyPage() {
        // 현재 사용자의 ID를 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // ID를 기반으로 사용자 정보 조회
        UserDto userDto = userService.getUserInfo(username);

        return Api.OK(userDto);
    }
    @PutMapping("/mypage")
    public Api<Object> updateUserProfile(
            @RequestHeader(name = HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody UserDto updateUserDto
    ) {
        try {
            // Bearer 다음의 공백 제거
            String token = authorizationHeader.replace("Bearer ", "");

            // 유저 정보 수정
            String userId = jwtTokenProvider.getUsername(token);
            userService.updateUserProfile(userId, updateUserDto);

            return Api.OK(null);
        } catch (Exception e) {
            e.printStackTrace();
            return Api.ERROR("유저 정보 수정 에러");
        }
    }
    @DeleteMapping("/withdraw")
    public Api<Object> withdrawUser(HttpServletRequest request) {
        try {
            // 토큰에서 사용자 ID 추출
            String token = jwtTokenProvider.resolveToken(request);
            String userId = jwtTokenProvider.getUsername(token);

            // 사용자 탈퇴
            userService.withdrawUser(userId);

            return Api.OK(null);
        } catch (Exception e) {
            e.printStackTrace();
            return Api.ERROR("회원 탈퇴 에러");
        }
    }
}
