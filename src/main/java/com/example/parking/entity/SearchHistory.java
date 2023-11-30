package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "search_history")
public class SearchHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "parking_id")
    private Parkinglot parkinglot;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;
}
