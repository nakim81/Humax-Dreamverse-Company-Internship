package com.example.parking.controller;


import com.example.parking.dto.PayDto;
import com.example.parking.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/user")
public class PayController {
    private final PayService payService;

    @Autowired
    public PayController(PayService payService) {
        this.payService = payService;
    }



    /*
     * 결제 수단 확인
     */
    @GetMapping("/{userId}/pay")
    public ResponseEntity<List<PayDto>> checkPaymentInfo(@PathVariable("userId") String userId) {

        // TODO: 토큰 유효성 확인
        




        List<PayDto> results = null;

        try {
            results = payService.getPayByUserId(Integer.parseInt(userId));
        }
        catch (Exception e) {
            throw new RuntimeException();
        }


        return ResponseEntity.status(HttpStatus.OK).body(results);
    }





    /*
     * 결제 수단 등록
     */
    @PostMapping("/{userId}/pay")
    public ResponseEntity<PayDto> registerPaymentInfo(@PathVariable("userId") Integer userId,
                                                      @RequestBody PayDto payDto) {
        // TODO: 토큰 유효성 확인






        try {
            payService.registerPayInfo(payDto, userId);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }





    /*
     * 결제 수단 수정
     */
    @PatchMapping("/{userId}/pay/{payId}")
    public ResponseEntity<PayDto> updatePaymentInfo(@PathVariable("userId") String userId,
                                                 @PathVariable("payId") String payId,
                                                 @RequestBody PayDto payDto) {

        // TODO: 토큰 유효성 확인





        try {
            payService.updatePayInfo(payDto);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<PayDto>(payDto,
                HttpStatus.OK);
    }




    /*
     * 결제 수단 삭제
     */
    @DeleteMapping("/{userId}/pay/{payId}")
    public ResponseEntity<PayDto> deletePaymentInfo(@PathVariable("userId") String userId,
                                                 @PathVariable("payId") String payId) {

        // TODO: 토큰 유효성 확인





        PayDto deletedData = null;

        try {
            deletedData = payService.deletePayInfo(Integer.parseInt(payId));

        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<PayDto>(deletedData,
                HttpStatus.OK);
    }

}
