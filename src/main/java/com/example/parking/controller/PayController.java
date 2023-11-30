package com.example.parking.controller;


import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.PayDto;
import com.example.parking.entity.User;
import com.example.parking.repository.UserRepository;
import com.example.parking.security.JwtTokenProvider;
import com.example.parking.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/user/{userId}/pay")
public class PayController {
    private final PayService payService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public PayController(PayService payService,
                         JwtTokenProvider jwtTokenProvider,
                         UserRepository userRepository) {
        this.payService = payService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }



    /*
     * 결제 수단 확인
     */
    @GetMapping
    public ResponseEntity<List<PayDto>> checkPaymentInfo(/*@RequestHeader("Authorization") String requestAccessToken,
                                                         */@PathVariable("userId") String userId) throws Exception {

        /*String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }*/

        List<PayDto> payDtos = payService.getPayByUserId(1L);

        return new ResponseEntity<List<PayDto>>(payDtos,
                HttpStatus.OK);
    }





    /*
     * 결제 수단 등록
     */
    @PostMapping
    public ResponseEntity<PayDto> registerPaymentInfo(@RequestHeader("Authorization") String requestAccessToken,
                                                      @PathVariable("userId") Long userId,
                                                      @RequestBody PayDto payDto) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }

        payService.registerPayInfo(payDto, user.get().getUserId());
       
        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }





    /*
     * 결제 수단 수정
     */
    @PatchMapping("/{payId}")
    public ResponseEntity<PayDto> updatePaymentInfo(@RequestHeader("Authorization") String requestAccessToken,
                                                    @PathVariable("userId") String userId,
                                                    @PathVariable("payId") String payId,
                                                    @RequestBody PayDto payDto) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }
        System.out.println(payDto);
        payService.updatePayInfo(payDto);
        
        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }




    /*
     * 결제 수단 삭제
     */
    @DeleteMapping("/{payId}")
    public ResponseEntity<PayDto> deletePaymentInfo(@RequestHeader("Authorization") String requestAccessToken,
                                                    @PathVariable("userId") String userId,
                                                    @PathVariable("payId") String payId) throws Exception {

        String userToken = null;

        if (requestAccessToken != null && requestAccessToken.startsWith("Bearer ")) {
            userToken = requestAccessToken.substring(7, requestAccessToken.length());
        }

        if(userToken == null || !jwtTokenProvider.validateToken(userToken)) {
            throw new ApiException(ErrorCode.BAD_REQUEST, "유효하지 않은 토큰입니다.");
        }

        String userName = jwtTokenProvider.getUsername(userToken);
        Optional<User> user = userRepository.findById(userName);

        if(user.isEmpty()) {
            throw new ApiException(ErrorCode.NULL_POINT, "잘못된 유저 정보입니다.");
        }


        PayDto deletedData = payService.deletePayInfo(Long.parseLong(payId));

        return new ResponseEntity<PayDto>(deletedData,
                HttpStatus.OK);
    }

}
