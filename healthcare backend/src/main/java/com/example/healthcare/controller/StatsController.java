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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping({"/api/stats", "/api/admin/stats"})
@CrossOrigin(origins = "*")
public class StatsController {

    private final VisitorRepository visitorRepository;
    private final ExhibitorRepository exhibitorRepository;
    private final SponsorshipRepository sponsorshipRepository;
    private final ContactInquiryRepository inquiryRepository;
    private final BlogRepository blogRepository;

    public StatsController(
            VisitorRepository visitorRepository,
            ExhibitorRepository exhibitorRepository,
            SponsorshipRepository sponsorshipRepository,
            ContactInquiryRepository inquiryRepository,
            BlogRepository blogRepository) {
        this.visitorRepository = visitorRepository;
        this.exhibitorRepository = exhibitorRepository;
        this.sponsorshipRepository = sponsorshipRepository;
        this.inquiryRepository = inquiryRepository;
        this.blogRepository = blogRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        long totalVisitors = visitorRepository.count();
        long vipDelegates = visitorRepository.findAll().stream()
                .filter(v -> "vip".equalsIgnoreCase(v.getPassType()))
                .count();
        long standardVisitors = Math.max(0, totalVisitors - vipDelegates);

        long totalExhibitors = exhibitorRepository.count();
        long approvedExhibitors = exhibitorRepository.findAll().stream()
                .filter(e -> "Approved".equalsIgnoreCase(e.getStatus()))
                .count();
        long pendingExhibitors = Math.max(0, totalExhibitors - approvedExhibitors);

        long totalSponsorships = sponsorshipRepository.count();
        long totalSponsorshipValue = sponsorshipRepository.findAll().stream()
                .mapToLong(s -> {
                    if (s.getInvestment() == null) return 0L;
                    String num = s.getInvestment().replaceAll("[^0-9]", "");
                    if (num.isEmpty()) return 0L;
                    try {
                        return Long.parseLong(num);
                    } catch (NumberFormatException e) {
                        return 0L;
                    }
                })
                .sum();

        long totalInquiries = inquiryRepository.count();
        long totalBlogs = blogRepository.count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalVisitors", totalVisitors);
        stats.put("vipDelegates", vipDelegates);
        stats.put("standardVisitors", standardVisitors);
        stats.put("totalExhibitors", totalExhibitors);
        stats.put("approvedExhibitors", approvedExhibitors);
        stats.put("pendingExhibitors", pendingExhibitors);
        stats.put("totalSponsorships", totalSponsorships);
        stats.put("totalSponsorshipValue", totalSponsorshipValue);
        stats.put("totalInquiries", totalInquiries);
        stats.put("totalBlogs", totalBlogs);
        stats.put("floorOccupancy", "86.4%");

        return ResponseEntity.ok(stats);
    }
}
