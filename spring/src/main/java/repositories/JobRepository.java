package com.cis3760.digimind.application.repositories;

import com.cis3760.digimind.application.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Integer> {
}
