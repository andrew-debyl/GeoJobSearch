package com.cis3760.digimind.application.controllers;

import com.cis3760.digimind.application.entities.Job;
import com.cis3760.digimind.application.repositories.JobRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class JobsController {
    
    private final JobRepository jobRepository;

    public JobsController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping(path = "/api/jobs")
    public ResponseEntity<List<Job>> getJobs() {
        List<Job> jobs = jobRepository.findAll();
        return ResponseEntity.ok(jobs);
    }
}
