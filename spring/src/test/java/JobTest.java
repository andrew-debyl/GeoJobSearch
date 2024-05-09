package com.cis3760.digimind.application.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JobTest {

    @Test
    void testJobGettersAndSetters() {
        Job job = new Job();

        // Set values
        job.setJobId(1);
        job.setLocationId(2);
        job.setCompanyName("Test Company");
        job.setJobType("Full-time");
        job.setJobTitle("Software Engineer");
        job.setJobSalary("100000");
        job.setJobDescription("Develop software applications.");

        // Assert that getters return the correct values
        assertEquals(1, job.getJobId());
        assertEquals(2, job.getLocationId());
        assertEquals("Test Company", job.getCompanyName());
        assertEquals("Full-time", job.getJobType());
        assertEquals("Software Engineer", job.getJobTitle());
        assertEquals("100000", job.getJobSalary());
        assertEquals("Develop software applications.", job.getJobDescription());
    }
}
