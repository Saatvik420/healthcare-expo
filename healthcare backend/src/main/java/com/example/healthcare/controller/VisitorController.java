package com.example.healthcare.controller;

import com.example.healthcare.model.Visitor;
import com.example.healthcare.repository.VisitorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorRepository visitorRepository;

    public VisitorController(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorRepository.findAllByOrderByIdDesc());
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

    @DeleteMapping("/{identifier}")
    public ResponseEntity<Void> deleteVisitor(@PathVariable String identifier) {
        // identifier can be numeric ID or visitorCode
        try {
            Long numericId = Long.parseLong(identifier);
            if (visitorRepository.existsById(numericId)) {
                visitorRepository.deleteById(numericId);
                return ResponseEntity.noContent().build();
            }
        } catch (NumberFormatException ignored) {
        }

        Optional<Visitor> optional = visitorRepository.findByVisitorCode(identifier);
        if (optional.isPresent()) {
            visitorRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
