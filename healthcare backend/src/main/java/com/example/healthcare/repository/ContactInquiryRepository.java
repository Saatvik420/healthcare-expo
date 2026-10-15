package com.example.healthcare.repository;

import com.example.healthcare.model.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {
    List<ContactInquiry> findAllByOrderBySubmittedAtDesc();
    Optional<ContactInquiry> findByInquiryCode(String inquiryCode);
}
