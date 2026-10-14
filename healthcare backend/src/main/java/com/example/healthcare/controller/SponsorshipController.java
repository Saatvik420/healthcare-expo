package com.example.healthcare.controller;

import com.example.healthcare.dto.StatusUpdateRequest;
import com.example.healthcare.model.Sponsorship;
import com.example.healthcare.repository.SponsorshipRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sponsorships")
@CrossOrigin(origins = "*")
public class SponsorshipController {

    private final SponsorshipRepository sponsorshipRepository;

    public SponsorshipController(SponsorshipRepository sponsorshipRepository) {
        this.sponsorshipRepository = sponsorshipRepository;
    }

    @GetMapping
    public ResponseEntity<List<Sponsorship>> getAllSponsorships() {
        return ResponseEntity.ok(sponsorshipRepository.findAllByOrderByIdDesc());
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<Sponsorship> getSponsorshipByIdentifier(@PathVariable String identifier) {
        return findByIdentifier(identifier)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sponsorship> createSponsorship(@RequestBody Sponsorship sponsorship) {
        if (sponsorship.getSponsorshipCode() == null || sponsorship.getSponsorshipCode().isEmpty()) {
            sponsorship.setSponsorshipCode("sp_" + System.currentTimeMillis());
        }
        if (sponsorship.getStatus() == null || sponsorship.getStatus().isEmpty()) {
            sponsorship.setStatus("In Discussion");
        }
        Sponsorship saved = sponsorshipRepository.save(sponsorship);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{identifier}")
    public ResponseEntity<Sponsorship> updateSponsorship(
            @PathVariable String identifier,
            @RequestBody Sponsorship updateData) {
        Optional<Sponsorship> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Sponsorship current = optional.get();
        if (updateData.getCompany() != null) current.setCompany(updateData.getCompany());
        if (updateData.getContactPerson() != null) current.setContactPerson(updateData.getContactPerson());
        if (updateData.getEmail() != null) current.setEmail(updateData.getEmail());
        if (updateData.getPhone() != null) current.setPhone(updateData.getPhone());
        if (updateData.getTier() != null) current.setTier(updateData.getTier());
        if (updateData.getInvestment() != null) current.setInvestment(updateData.getInvestment());
        if (updateData.getStatus() != null) current.setStatus(updateData.getStatus());
        if (updateData.getDate() != null) current.setDate(updateData.getDate());

        Sponsorship updated = sponsorshipRepository.save(current);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{identifier}/status")
    public ResponseEntity<Sponsorship> updateStatus(
            @PathVariable String identifier,
            @RequestBody StatusUpdateRequest request) {
        Optional<Sponsorship> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Sponsorship sponsorship = optional.get();
        sponsorship.setStatus(request.getStatus());
        Sponsorship updated = sponsorshipRepository.save(sponsorship);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{identifier}")
    public ResponseEntity<Void> deleteSponsorship(@PathVariable String identifier) {
        Optional<Sponsorship> optional = findByIdentifier(identifier);
        if (optional.isPresent()) {
            sponsorshipRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private Optional<Sponsorship> findByIdentifier(String identifier) {
        try {
            Long numericId = Long.parseLong(identifier);
            Optional<Sponsorship> byId = sponsorshipRepository.findById(numericId);
            if (byId.isPresent()) return byId;
        } catch (NumberFormatException ignored) {
        }
        return sponsorshipRepository.findBySponsorshipCode(identifier);
    }
}
