package com.example.healthcare.controller;

import com.example.healthcare.dto.StatusUpdateRequest;
import com.example.healthcare.model.Exhibitor;
import com.example.healthcare.repository.ExhibitorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exhibitors")
@CrossOrigin(origins = "*")
public class ExhibitorController {

    private final ExhibitorRepository exhibitorRepository;

    public ExhibitorController(ExhibitorRepository exhibitorRepository) {
        this.exhibitorRepository = exhibitorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Exhibitor>> getAllExhibitors() {
        return ResponseEntity.ok(exhibitorRepository.findAllByOrderByIdDesc());
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<Exhibitor> getExhibitorByIdentifier(@PathVariable String identifier) {
        return findByIdentifier(identifier)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Exhibitor> createExhibitor(@RequestBody Exhibitor exhibitor) {
        if (exhibitor.getExhibitorCode() == null || exhibitor.getExhibitorCode().isEmpty()) {
            exhibitor.setExhibitorCode("exh_" + System.currentTimeMillis());
        }
        if (exhibitor.getStatus() == null || exhibitor.getStatus().isEmpty()) {
            exhibitor.setStatus("Pending Review");
        }
        Exhibitor saved = exhibitorRepository.save(exhibitor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{identifier}")
    public ResponseEntity<Exhibitor> updateExhibitor(
            @PathVariable String identifier,
            @RequestBody Exhibitor updateData) {
        Optional<Exhibitor> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Exhibitor current = optional.get();
        if (updateData.getCompany() != null) current.setCompany(updateData.getCompany());
        if (updateData.getContactPerson() != null) current.setContactPerson(updateData.getContactPerson());
        if (updateData.getDesignation() != null) current.setDesignation(updateData.getDesignation());
        if (updateData.getEmail() != null) current.setEmail(updateData.getEmail());
        if (updateData.getPhone() != null) current.setPhone(updateData.getPhone());
        if (updateData.getWebsite() != null) current.setWebsite(updateData.getWebsite());
        if (updateData.getStallType() != null) current.setStallType(updateData.getStallType());
        if (updateData.getHall() != null) current.setHall(updateData.getHall());
        if (updateData.getAmount() != null) current.setAmount(updateData.getAmount());
        if (updateData.getStatus() != null) current.setStatus(updateData.getStatus());
        if (updateData.getBookingDate() != null) current.setBookingDate(updateData.getBookingDate());
        if (updateData.getNotes() != null) current.setNotes(updateData.getNotes());

        Exhibitor updated = exhibitorRepository.save(current);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{identifier}/status")
    public ResponseEntity<Exhibitor> updateStatus(
            @PathVariable String identifier,
            @RequestBody StatusUpdateRequest request) {
        Optional<Exhibitor> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Exhibitor exhibitor = optional.get();
        exhibitor.setStatus(request.getStatus());
        Exhibitor updated = exhibitorRepository.save(exhibitor);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{identifier}")
    public ResponseEntity<Void> deleteExhibitor(@PathVariable String identifier) {
        Optional<Exhibitor> optional = findByIdentifier(identifier);
        if (optional.isPresent()) {
            exhibitorRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private Optional<Exhibitor> findByIdentifier(String identifier) {
        try {
            Long numericId = Long.parseLong(identifier);
            Optional<Exhibitor> byId = exhibitorRepository.findById(numericId);
            if (byId.isPresent()) return byId;
        } catch (NumberFormatException ignored) {
        }
        return exhibitorRepository.findByExhibitorCode(identifier);
    }
}
