package com.example.healthcare.controller;

import com.example.healthcare.model.ContactInquiry;
import com.example.healthcare.repository.ContactInquiryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactInquiryRepository inquiryRepository;

    public ContactController(ContactInquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<ContactInquiry> submitInquiry(@RequestBody ContactInquiry inquiry) {
        ContactInquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactInquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAllByOrderBySubmittedAtDesc());
    }
}
