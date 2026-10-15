package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@NoArgsConstructor
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
    private String country;
    private String sector;
    private String sectorLabel;
    private String passType; // 'vip', 'standard'
    private String passCode;
    private String attendDate;
    private String attendDay;
    private String status; // 'Confirmed', 'Pending'

    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;

    public Visitor(Long id, String visitorCode, String name, String email, String phone,
                   String organization, String designation, String country, String sector,
                   String sectorLabel, String passType, String passCode, String attendDate,
                   String attendDay, String status, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.visitorCode = visitorCode;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.organization = organization;
        this.designation = designation;
        this.country = country;
        this.sector = sector;
        this.sectorLabel = sectorLabel;
        this.passType = passType;
        this.passCode = passCode;
        this.attendDate = attendDate;
        this.attendDay = attendDay;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
    }

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
        if (country == null || country.isEmpty()) {
            country = "India";
        }
        if (attendDay == null || attendDay.isEmpty()) {
            attendDay = "all";
        }
    }
}
