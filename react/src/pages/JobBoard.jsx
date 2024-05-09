import React from "react";
import PropTypes from "prop-types";
import JobDisplay from "../components/JobDisplay";
import "../styles/JobBoard.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";

function JobBoard({ jobData }) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="jobboard">
      <div className="jobboard__heading-wrapper">
        <div className="jobboard__search-wrapper">
          <input
            type="text"
            className="jobboard--input"
            placeholder="Search by job title"
          />
          <p className="jobboard--search">Search</p>
        </div>
        <div className="jobboard__filter-wrapper">
          <div className="filter">
            <p className="filter-text">Major</p>
            <IoMdArrowDropdown className="jobboard-icon" />
          </div>
          <div className="filter">
            <p className="filter-text">Hours</p>
            <IoMdArrowDropdown className="jobboard-icon" />
          </div>
          <div className="filter">
            <p className="filter-text">Salary</p>
            <IoMdArrowDropdown className="jobboard-icon" />
          </div>
          <div className="filter">
            <p className="filter-text">Benefits</p>
            <IoMdArrowDropdown className="jobboard-icon" />
          </div>
        </div>
      </div>
      <div className="showing-results">
        <p className="showing-results--text">
          Showing results for &quot;temp&quot;
        </p>
      </div>
      {jobData.length > 0 ? (
        <div className="jobboard-wrapper">
          {jobData.map((data, index) => {
            return (
              <div
                className="jobboard__container--wrapper"
                key={index}
                onClick={scrollToTop}
              >
                <Link to={`/jobs/${data.jobId}`} className="jobboard__link">
                  <JobDisplay
                    title={data.jobTitle}
                    company={data.companyName}
                    description={data.jobDescription}
                    salary={data.jobSalary}
                    location={data.jobLocation}
                    flipper={1}
                  ></JobDisplay>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="jobboard-wrapper--skeleton">
          <div className="loading-animation">
            <FaCircleNotch size={50} />
          </div>
        </div>
      )}
    </div>
  );
}

// Add PropTypes validation
JobBoard.propTypes = {
  jobData: PropTypes.array.isRequired,
};

export default JobBoard;
