package com.example.parking.service;

import com.example.parking.common.error.ErrorCode;
import com.example.parking.common.exception.ApiException;
import com.example.parking.dto.PayDto;
import com.example.parking.entity.Pay;
import com.example.parking.entity.User;
import com.example.parking.repository.PayRepository;
import com.example.parking.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PayServiceImpl implements PayService {

    private final PayRepository payRepository;
    private final UserRepository userRepository;

    @Autowired
    public PayServiceImpl(PayRepository payRepository, UserRepository userRepository) {
        this.payRepository = payRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PayDto getPayById(Long payId) throws EntityNotFoundException {

        Pay payEntity = payRepository.getReferenceById(payId);

        return PayDto.of(payEntity);
    }

    @Override
    public List<PayDto> getPayByUserId(Long userId) {

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

        Pay pay = payRepository
                .findById(payDto.getPayId())
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "결제수단 정보가 없습니다."));

        pay.setPayName(payDto.getPayName());
        pay.setPayType(payDto.getPayType());
        pay.setPayNumber(payDto.getPayNumber());

        payRepository.save(pay);
    }


    @Override
    @Transactional
    public void registerPayInfo(PayDto payDto, Long userId) throws EntityNotFoundException {

        Pay pay = Pay.builder()
                .payName(payDto.getPayName())
                .payType(payDto.getPayType())
                .payNumber(payDto.getPayNumber())
                .build();

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "존재하지 않는 사용자입니다."));

        pay.setUser(user);

        if(pay.getPayType().equals("현금") || pay.getPayType().equals("기타")) {
            pay.setPayName(" ");
            pay.setPayNumber(" ");
        }

        payRepository.save(pay);
    }

    @Override
    @Transactional
    public PayDto deletePayInfo(Long payId) throws EntityNotFoundException {

        Pay pay = payRepository
                .findById(payId)
                .orElseThrow(() -> new ApiException(ErrorCode.NULL_POINT, "결제수단 정보가 없습니다."));

        payRepository.deleteById(payId);

        return PayDto.of(pay);
    }
}
