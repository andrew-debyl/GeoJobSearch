import React from "react";
import PropTypes from "prop-types";
import "../styles/SpecificJob.css";
import JobDisplay from "../components/JobDisplay";
import { useParams } from "react-router-dom";
import Map from "../components/Map";
import { FaCircleNotch } from "react-icons/fa";

function SpecificJob({ jobData }) {
  const { jobId } = useParams();
  const integerValue = parseInt(jobId, 10);

  return (
    <div>
      {jobData.length > 0 ? (
        <div className="specificjob__container">
          {jobData.map((job) => {
            if (job.jobId === integerValue) {
              return (
                <div className="specificjob__wrapper" key={jobId}>
                  <div className="specificjob--jobdisplay">
                    <JobDisplay
                      title={job.jobTitle}
                      company={job.companyName}
                      description={job.jobDescription}
                      salary={job.jobSalary}
                      location={job.jobLocation}
                      flipper={2}
                    />
                  </div>
                  <div className="specificjob--map">
                    <Map address={job.companyName}></Map>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <div className="loading--wrapper">
          <div className="loading-animation">
            <FaCircleNotch size={50} />
          </div>
        </div>
      )}
    </div>
  );
}

SpecificJob.propTypes = {
  jobData: PropTypes.array.isRequired,
};

export default SpecificJob;
