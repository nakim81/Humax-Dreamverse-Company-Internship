package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Pay {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer payId;
    private String payName;
    private String payType;
    private Integer payNumber;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @Builder
    public Pay(String payName, String payType, Integer payNumber){
        this.payName = payName;
        this.payType = payType;
        this.payNumber = payNumber;
    }
}
