package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class SearchHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer historyId;
    private String codeNumber;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @Builder
    public SearchHistory(String codeNumber, String name){
        this.codeNumber = codeNumber;
        this.name = name;
    }
}
