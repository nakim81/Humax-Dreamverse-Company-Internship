package com.example.parking.service;

import com.example.parking.dto.PayDto;

import java.util.List;

public interface PayService {

    PayDto getPayById(Integer payId) throws Exception;

    List<PayDto> getPayByUserId(Integer userId) throws Exception;

    void updatePayInfo(PayDto payDto) throws Exception;

    void registerPayInfo(PayDto payDto, Integer userId) throws Exception;

    PayDto deletePayInfo(Integer payId) throws Exception;
}
