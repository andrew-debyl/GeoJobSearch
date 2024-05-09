import React from "react";
import PropTypes from 'prop-types';
import "../styles/JobDisplay.css";

const TruncatedText = ({ text, maxLength, flipper }) => {
  if (text.length <= maxLength || flipper === 2) {
    return <>{text}</>;
  } else {
    return <>{text.slice(0, maxLength)}...</>;
  }
};

function JobDisplay({ title, description, salary, location, company, flipper }) {
  return (
    <div className="job-container">
      <h2 className="job-title">{title}</h2>
      <p className="job-company">{company}</p>
      <p className="job-salary">{salary}</p>
      <p className="job-description">
        <TruncatedText text={description} maxLength={500} flipper={flipper}/>
      </p>
      <p className="job-location">{location}</p>
    </div>
  );
}

JobDisplay.propTypes = {
  text: PropTypes.string,
  maxLength: PropTypes.number,
  flipper: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  salary: PropTypes.string,
  location: PropTypes.string,
  company: PropTypes.string
};

TruncatedText.propTypes = {
  text: PropTypes.string,
  maxLength: PropTypes.number,
  flipper: PropTypes.number,
};

export default JobDisplay;
