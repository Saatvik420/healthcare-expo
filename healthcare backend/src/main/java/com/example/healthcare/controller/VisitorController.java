package com.example.healthcare.controller;

import com.example.healthcare.dto.StatusUpdateRequest;
import com.example.healthcare.model.Visitor;
import com.example.healthcare.repository.VisitorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "*")
public class VisitorController {

    private final VisitorRepository visitorRepository;

    public VisitorController(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorRepository.findAllByOrderByIdDesc());
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<Visitor> getVisitorByIdentifier(@PathVariable String identifier) {
        return findByIdentifier(identifier)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Visitor> createVisitor(@RequestBody Visitor visitor) {
        if (visitor.getVisitorCode() == null || visitor.getVisitorCode().isEmpty()) {
            visitor.setVisitorCode("vis_" + System.currentTimeMillis());
        }
        if (visitor.getStatus() == null || visitor.getStatus().isEmpty()) {
            visitor.setStatus("Confirmed");
        }
        Visitor saved = visitorRepository.save(visitor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{identifier}")
    public ResponseEntity<Visitor> updateVisitor(
            @PathVariable String identifier,
            @RequestBody Visitor updateData) {
        Optional<Visitor> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Visitor current = optional.get();
        if (updateData.getName() != null) current.setName(updateData.getName());
        if (updateData.getEmail() != null) current.setEmail(updateData.getEmail());
        if (updateData.getPhone() != null) current.setPhone(updateData.getPhone());
        if (updateData.getOrganization() != null) current.setOrganization(updateData.getOrganization());
        if (updateData.getDesignation() != null) current.setDesignation(updateData.getDesignation());
        if (updateData.getCountry() != null) current.setCountry(updateData.getCountry());
        if (updateData.getSector() != null) current.setSector(updateData.getSector());
        if (updateData.getSectorLabel() != null) current.setSectorLabel(updateData.getSectorLabel());
        if (updateData.getPassType() != null) current.setPassType(updateData.getPassType());
        if (updateData.getPassCode() != null) current.setPassCode(updateData.getPassCode());
        if (updateData.getAttendDate() != null) current.setAttendDate(updateData.getAttendDate());
        if (updateData.getAttendDay() != null) current.setAttendDay(updateData.getAttendDay());
        if (updateData.getStatus() != null) current.setStatus(updateData.getStatus());
        if (updateData.getNotes() != null) current.setNotes(updateData.getNotes());

        Visitor updated = visitorRepository.save(current);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{identifier}/status")
    public ResponseEntity<Visitor> updateVisitorStatus(
            @PathVariable String identifier,
            @RequestBody StatusUpdateRequest request) {
        Optional<Visitor> optional = findByIdentifier(identifier);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Visitor visitor = optional.get();
        visitor.setStatus(request.getStatus());
        Visitor updated = visitorRepository.save(visitor);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{identifier}")
    public ResponseEntity<Void> deleteVisitor(@PathVariable String identifier) {
        Optional<Visitor> optional = findByIdentifier(identifier);
        if (optional.isPresent()) {
            visitorRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    private Optional<Visitor> findByIdentifier(String identifier) {
        try {
            Long numericId = Long.parseLong(identifier);
            Optional<Visitor> byId = visitorRepository.findById(numericId);
            if (byId.isPresent()) return byId;
        } catch (NumberFormatException ignored) {
        }
        Optional<Visitor> byCode = visitorRepository.findByVisitorCode(identifier);
        if (byCode.isPresent()) return byCode;
        return visitorRepository.findByPassCode(identifier);
    }
}
