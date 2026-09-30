package com.example.healthcare.repository;

import com.example.healthcare.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findAllByOrderByIdDesc();
    Optional<Visitor> findByVisitorCode(String visitorCode);
    void deleteByVisitorCode(String visitorCode);
}
