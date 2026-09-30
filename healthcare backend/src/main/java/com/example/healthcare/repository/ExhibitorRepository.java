package com.example.healthcare.repository;

import com.example.healthcare.model.Exhibitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExhibitorRepository extends JpaRepository<Exhibitor, Long> {
    List<Exhibitor> findAllByOrderByIdDesc();
    Optional<Exhibitor> findByExhibitorCode(String exhibitorCode);
    void deleteByExhibitorCode(String exhibitorCode);
}
