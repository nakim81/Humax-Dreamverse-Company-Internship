package com.example.parking.controller.user;

import com.example.parking.common.api.Api;
import com.example.parking.dto.user.UserSignUpDto;
import com.example.parking.service.user.UserSignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserSignUpController {
    @Autowired
    private UserSignUpService userSignUpService;

    @PostMapping("/sign-up")
    public Api<Object> signUp(@Validated @RequestBody UserSignUpDto userSignUpDto){
        userSignUpService.signUp(userSignUpDto);
        return Api.OK(null);
    }
}
