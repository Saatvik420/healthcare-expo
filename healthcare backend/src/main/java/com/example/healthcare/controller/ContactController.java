package com.example.healthcare.controller;

import com.example.healthcare.dto.StatusUpdateRequest;
import com.example.healthcare.model.ContactInquiry;
import com.example.healthcare.repository.ContactInquiryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/contact", "/api/contacts"})
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactInquiryRepository inquiryRepository;

    public ContactController(ContactInquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<ContactInquiry> submitInquiry(@RequestBody ContactInquiry inquiry) {
        if (inquiry.getInquiryCode() == null || inquiry.getInquiryCode().isEmpty()) {
            inquiry.setInquiryCode("inq_" + System.currentTimeMillis());
        }
        if (inquiry.getStatus() == null || inquiry.getStatus().isEmpty()) {
            inquiry.setStatus("New");
        }
        ContactInquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactInquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAllByOrderBySubmittedAtDesc());
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<ContactInquiry> getInquiryByIdentifier(@PathVariable String identifier) {
        return findByIdentifier(identifier)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{identifier}/status")
    public ResponseEntity<ContactInquiry> updateInquiryStatus(
            @PathVariable String identifier,
            @RequestBody StatusUpdateRequest request) {
        Optional<ContactInquiry> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ContactInquiry inquiry = optional.get();
        inquiry.setStatus(request.getStatus());
        ContactInquiry updated = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{identifier}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable String identifier) {
        Optional<ContactInquiry> optional = findByIdentifier(identifier);
        if (optional.isPresent()) {
            inquiryRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private Optional<ContactInquiry> findByIdentifier(String identifier) {
        try {
            Long numericId = Long.parseLong(identifier);
            Optional<ContactInquiry> byId = inquiryRepository.findById(numericId);
            if (byId.isPresent()) return byId;
        } catch (NumberFormatException ignored) {
        }
        return inquiryRepository.findByInquiryCode(identifier);
    }
}
