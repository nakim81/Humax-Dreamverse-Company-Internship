package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String id;
    private String password;
    private String phoneNum;
    private String email;
    private boolean admin;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Car> car = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Pay> payList = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<SearchHistory> searchHistoryList = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Favorites> favoritesList = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();

    @Builder
    public User(String id, String password, String phoneNum, String email, boolean admin){
        this.id = id;
        this.password = password;
        this.phoneNum = phoneNum;
        this.email = email;
        this.admin = admin;
    }
}
