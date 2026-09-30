package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String visitorCode; // e.g. vis_101 or IGHE-2027-xxx

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String organization;
    private String designation;
    private String sector;
    private String sectorLabel;
    private String passType; // 'vip', 'standard'
    private String passCode;
    private String attendDate;
    private String status; // 'Confirmed', 'Pending'

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (visitorCode == null || visitorCode.isEmpty()) {
            visitorCode = "vis_" + System.currentTimeMillis();
        }
        if (status == null || status.isEmpty()) {
            status = "Confirmed";
        }
    }
}
