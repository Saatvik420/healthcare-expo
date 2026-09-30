package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // 'admin', 'visitor', 'exhibitor'

    private String phone;
    private String organization;
    private String designation;
    private String company;
    private String sector;
    private String stallType;
    private String hall;
    private String passCode;
    private String status;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (uid == null) {
            uid = "usr_" + System.currentTimeMillis();
        }
    }
}
