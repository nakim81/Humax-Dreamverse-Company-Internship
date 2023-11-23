package com.example.parking.service;

import com.example.parking.dto.PayDto;
import com.example.parking.entity.Pay;
import com.example.parking.entity.User;
import com.example.parking.repository.PayRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PayServiceImpl implements PayService {

    private final PayRepository payRepository;

    @Autowired
    public PayServiceImpl(PayRepository payRepository) {
        this.payRepository = payRepository;
    }

    @Override
    public PayDto getPayById(Integer payId) throws EntityNotFoundException {

        Pay payEntity = payRepository.getReferenceById(payId);

        return PayDto.of(payEntity);
    }

    @Override
    public List<PayDto> getPayByUserId(Integer userId) {

        List<Pay> payEntity = payRepository.findByUserUserId(userId);
        List<PayDto> payDtos = new ArrayList<>();
        for (Pay pay : payEntity) {
            payDtos.add(PayDto.of(pay));
        }

        return payDtos;
    }

    @Override
    @Transactional
    public void updatePayInfo(PayDto payDto) throws EntityNotFoundException {

        Pay pay = payRepository.getReferenceById(payDto.getPay_id());
        pay.setPayName(payDto.getPay_name());
        pay.setPayType(payDto.getPay_type());
        pay.setPayNumber(payDto.getPay_number());

        payRepository.save(pay);
    }


    @Override
    @Transactional
    public void registerPayInfo(PayDto payDto, Integer userId) throws EntityNotFoundException {

        Pay pay = Pay.builder()
                .payName(payDto.getPay_name())
                .payType(payDto.getPay_type())
                .payNumber(payDto.getPay_number())
                .build();



        // TODO: 유저 검색 후 맞는 유저를 주입





        // TEST: 더미 유저 대입 후 밀어 넣기
        // =====================================================================
        User dummy = User.builder()
                .id("ksw")
                .email("n@gmail.com")
                .password("1234")
                .phoneNum(1012345678).build();
        dummy.setUserId(1);
        pay.setUser(dummy);
        System.out.println(pay.getUser());
        // =====================================================================



        payRepository.save(pay);
    }

    @Override
    @Transactional
    public PayDto deletePayInfo(Integer payId) throws EntityNotFoundException {
        // TODO : pay table 에서 payId를 이용 하여 검색 후 나온 결과 값 존재 시 삭제

        Pay pay = payRepository.getReferenceById(payId);
        payRepository.deleteById(payId);

        return PayDto.of(pay);
    }
}
