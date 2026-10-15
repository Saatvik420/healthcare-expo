package com.example.healthcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exhibitors")
@Data
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
    private String website;
    private String stallType;
    private String hall;
    private String amount;
    private String status; // 'Approved', 'Pending Review', 'Contract Dispatched'
    private String bookingDate;

    @Column(length = 2000)
    private String notes;

    private LocalDateTime createdAt;

    public Exhibitor() {
    }

    public Exhibitor(Long id, String exhibitorCode, String company, String contactPerson,
                     String designation, String email, String phone, String website,
                     String stallType, String hall, String amount, String status,
                     String bookingDate, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.exhibitorCode = exhibitorCode;
        this.company = company;
        this.contactPerson = contactPerson;
        this.designation = designation;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.stallType = stallType;
        this.hall = hall;
        this.amount = amount;
        this.status = status;
        this.bookingDate = bookingDate;
        this.notes = notes;
        this.createdAt = createdAt;
    }

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
