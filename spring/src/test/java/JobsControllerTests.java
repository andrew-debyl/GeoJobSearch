package com.cis3760.digimind.application.controllers;

import com.cis3760.digimind.application.entities.Job;
import com.cis3760.digimind.application.repositories.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JobsController.class)
public class JobsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobRepository jobRepository;

    @Test
    public void getJobs_ShouldReturnJobs() throws Exception {
        Job job = new Job();
        job.setJobTitle("Software Engineer");

        given(jobRepository.findAll()).willReturn(Collections.singletonList(job));

        mockMvc.perform(get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].jobTitle").value("Software Engineer"));
    }
}
