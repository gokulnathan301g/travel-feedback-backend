package com.example.traval.controller;

import com.example.traval.model.Experience;
import com.example.traval.repository.ExperienceRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceRepository repo;

    @PostMapping
    public ResponseEntity<Experience> submitExperience(@RequestBody Experience exp){
        Experience saved = repo.save(exp);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Experience>> search(@RequestParam("q") String q){
        List<Experience> list = repo.findByCityContainingIgnoreCaseOrTitleContainingIgnoreCase(q,q);
        return ResponseEntity.ok(list);
    }
}
