package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_inquiries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inquiryCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String organization;
    private String inquiryType; // 'general', 'exhibitor', 'visitor', 'sponsorship'
    private String subject;

    @Column(length = 2000)
    private String message;

    private String status; // 'New', 'Replied', 'Under Review', 'Archived'
    private String date;

    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        if (submittedAt == null) {
            submittedAt = LocalDateTime.now();
        }
        if (inquiryCode == null || inquiryCode.isEmpty()) {
            inquiryCode = "inq_" + System.currentTimeMillis();
        }
        if (status == null || status.isEmpty()) {
            status = "New";
        }
    }
}
