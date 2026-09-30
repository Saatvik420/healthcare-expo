package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exhibitors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exhibitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String exhibitorCode; // e.g. exh_201 or IGHE-EXH-xxx

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String contactPerson;

    private String designation;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String stallType;
    private String hall;
    private String amount;
    private String status; // 'Approved', 'Pending Review', 'Contract Dispatched'
    private String bookingDate;

    @Column(length = 2000)
    private String notes;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (exhibitorCode == null || exhibitorCode.isEmpty()) {
            exhibitorCode = "exh_" + System.currentTimeMillis();
        }
        if (status == null || status.isEmpty()) {
            status = "Pending Review";
        }
    }
}
