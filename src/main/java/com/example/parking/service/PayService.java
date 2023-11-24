package com.example.parking.service;

import com.example.parking.dto.PayDto;

import java.util.List;

public interface PayService {

    PayDto getPayById(Long payId) throws Exception;

    List<PayDto> getPayByUserId(Long userId) throws Exception;

    void updatePayInfo(PayDto payDto) throws Exception;

    void registerPayInfo(PayDto payDto, Long userId) throws Exception;

    PayDto deletePayInfo(Long payId) throws Exception;
}
