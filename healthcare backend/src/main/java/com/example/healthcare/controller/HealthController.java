package com.example.healthcare.controller;

import com.example.healthcare.repository.BlogRepository;
import com.example.healthcare.repository.ContactInquiryRepository;
import com.example.healthcare.repository.ExhibitorRepository;
import com.example.healthcare.repository.SponsorshipRepository;
import com.example.healthcare.repository.VisitorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HealthController {

    private final VisitorRepository visitorRepository;
    private final ExhibitorRepository exhibitorRepository;
    private final SponsorshipRepository sponsorshipRepository;
    private final BlogRepository blogRepository;
    private final ContactInquiryRepository inquiryRepository;

    public HealthController(
            VisitorRepository visitorRepository,
            ExhibitorRepository exhibitorRepository,
            SponsorshipRepository sponsorshipRepository,
            BlogRepository blogRepository,
            ContactInquiryRepository inquiryRepository) {
        this.visitorRepository = visitorRepository;
        this.exhibitorRepository = exhibitorRepository;
        this.sponsorshipRepository = sponsorshipRepository;
        this.blogRepository = blogRepository;
        this.inquiryRepository = inquiryRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Healthcare Expo Backend");
        status.put("database", "H2 In-Memory (JPA)");
        status.put("visitorCount", visitorRepository.count());
        status.put("exhibitorCount", exhibitorRepository.count());
        status.put("sponsorshipCount", sponsorshipRepository.count());
        status.put("blogCount", blogRepository.count());
        status.put("inquiryCount", inquiryRepository.count());
        status.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(status);
    }
}
