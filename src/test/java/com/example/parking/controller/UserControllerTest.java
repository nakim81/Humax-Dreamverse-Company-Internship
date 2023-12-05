package com.example.parking.controller;

import com.example.parking.ParkingApplication;
import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.error.UserErrorCode;
import com.example.parking.dto.UserDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest(classes = ParkingApplication.class)
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void signUp_ValidInput() throws Exception{
        UserDto userDto = new UserDto(null, "hwang", "hello123", "01012345678", "kim@gamil.com",false);

        mockMvc.perform(post("/user/sign-up")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(result -> jsonPath("$.result.resultCode").value(ErrorCode.OK.getErrorCode()));
    }

    @Test
    void signUp_DuplicateId_ShouldReturnError() throws Exception {
        // 유저ID가 이미 있다고 가정
        UserDto userDto = new UserDto(null, "existingUserTest", "password777", "01023451234", "existing@naver.com",false);

        mockMvc.perform(post("/user/sign-up")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(result -> jsonPath("$.result.resultCode").value(UserErrorCode.DUPLICATE_ID.getErrorCode()));
    }
}
