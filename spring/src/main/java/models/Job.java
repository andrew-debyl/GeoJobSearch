package com.cis3760.digimind.application.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer jobId;

    @Column(name = "location_id")
    private Integer locationId;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "job_salary")
    private String jobSalary;

    @Column(name = "job_description")
    private String jobDescription;

    // Getters
    public Integer getJobId() {
        return jobId;
    }

    public Integer getLocationId() {
        return locationId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getJobType() {
        return jobType;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getJobSalary() {
        return jobSalary;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    // Setters
    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public void setLocationId(Integer locationId) {
        this.locationId = locationId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setJobSalary(String jobSalary) {
        this.jobSalary = jobSalary;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
