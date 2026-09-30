package com.example.healthcare.repository;

import com.example.healthcare.model.Sponsorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SponsorshipRepository extends JpaRepository<Sponsorship, Long> {
    List<Sponsorship> findAllByOrderByIdDesc();
    Optional<Sponsorship> findBySponsorshipCode(String sponsorshipCode);
}
