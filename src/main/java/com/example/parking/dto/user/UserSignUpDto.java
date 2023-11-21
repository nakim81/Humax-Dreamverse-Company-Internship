package com.example.parking.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpDto {
    @NotEmpty(message = "아이디는 필수 입력값입니다.")
    private String id;
    @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
    private String password;
    @NotEmpty(message = "전화번호는 필수 입력값입니다.")
    private String phoneNum;
    @NotEmpty(message = "이메일은 필수 입력값입니다.")
    private String email;
}

