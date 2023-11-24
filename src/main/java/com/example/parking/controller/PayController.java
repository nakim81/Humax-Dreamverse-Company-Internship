package com.example.parking.controller;


import com.example.parking.dto.PayDto;
import com.example.parking.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/user/{userId}/pay")
public class PayController {
    private final PayService payService;

    @Autowired
    public PayController(PayService payService) {
        this.payService = payService;
    }



    /*
     * 결제 수단 확인
     */
    @GetMapping
    public ResponseEntity<List<PayDto>> checkPaymentInfo(@PathVariable("userId") String userId) throws Exception {

        // TODO: 토큰 유효성 검증
        



        List<PayDto> payDtos = payService.getPayByUserId(Long.parseLong(userId));

        return new ResponseEntity<List<PayDto>>(payDtos,
                HttpStatus.OK);
    }





    /*
     * 결제 수단 등록
     */
    @PostMapping
    public ResponseEntity<PayDto> registerPaymentInfo(@PathVariable("userId") Long userId,
                                                      @RequestBody PayDto payDto) throws Exception {
        // TODO: 토큰 유효성 검증




        
        payService.registerPayInfo(payDto, userId);
       
        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }





    /*
     * 결제 수단 수정
     */
    @PatchMapping("/{payId}")
    public ResponseEntity<PayDto> updatePaymentInfo(@PathVariable("userId") String userId,
                                                    @PathVariable("payId") String payId,
                                                    @RequestBody PayDto payDto) throws Exception {

        // TODO: 토큰 유효성 검증




        
        payService.updatePayInfo(payDto);
        
        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }




    /*
     * 결제 수단 삭제
     */
    @DeleteMapping("/{payId}")
    public ResponseEntity<PayDto> deletePaymentInfo(@PathVariable("userId") String userId,
                                                 @PathVariable("payId") String payId) throws Exception {

        // TODO: 토큰 유효성 검증



        
        PayDto deletedData = payService.deletePayInfo(Long.parseLong(payId));
        
        return new ResponseEntity<PayDto>(deletedData,
                HttpStatus.OK);
    }

}
