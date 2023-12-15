package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Pay {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;
    private String payName;
    private String payType;
    private String payNumber;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @Builder
    public Pay(String payName, String payType, String payNumber){
        this.payName = payName;
        this.payType = payType;
        this.payNumber = payNumber;
    }
}
