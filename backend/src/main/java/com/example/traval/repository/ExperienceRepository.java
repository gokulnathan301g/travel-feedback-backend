package com.example.traval.repository;

import com.example.traval.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByCityContainingIgnoreCaseOrTitleContainingIgnoreCase(String city, String title);
}
