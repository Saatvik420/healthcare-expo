package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sponsorships")
@Data
@NoArgsConstructor
@Builder
public class Sponsorship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sponsorshipCode; // e.g. sp_301

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String contactPerson;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String tier; // e.g. 'Platinum Partner', 'Gold Partner'
    private String investment;
    private String status; // 'Agreement Signed', 'In Discussion'
    private String date;

    private LocalDateTime createdAt;

    public Sponsorship(Long id, String sponsorshipCode, String company, String contactPerson,
                       String email, String phone, String tier, String investment,
                       String status, String date, LocalDateTime createdAt) {
        this.id = id;
        this.sponsorshipCode = sponsorshipCode;
        this.company = company;
        this.contactPerson = contactPerson;
        this.email = email;
        this.phone = phone;
        this.tier = tier;
        this.investment = investment;
        this.status = status;
        this.date = date;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (sponsorshipCode == null || sponsorshipCode.isEmpty()) {
            sponsorshipCode = "sp_" + System.currentTimeMillis();
        }
        if (status == null || status.isEmpty()) {
            status = "In Discussion";
        }
    }
}
