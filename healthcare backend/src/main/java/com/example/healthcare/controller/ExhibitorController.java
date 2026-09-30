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
