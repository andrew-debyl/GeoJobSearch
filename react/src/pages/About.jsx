import React from "react";
import map from "../assets/map.svg";
import "../styles/About.css";

function About() {
  return (
    <div className="about__wrapper">
      <div className="about__left">
        <div className="about__header-wrapper">
          <h2>Why Choose StudentGeoJobSearch?</h2>
        </div>
        <div className="about__img-wrapper">
          <img src={map} alt="" className="about-img" />
        </div>
      </div>
      <div className="about__right">
        <div className="about__para-wrapper">
          <p className="about__para">
            Imagine a student, juggling exams, assignments, and the stress of
            financial insecurity. StudentGeoJobSearch enters the scene as a
            beacon of hope, transforming the daunting job search process into a
            seamless and rewarding experience. StudentGeoJobSearch stands out by
            focusing exclusively on curating opportunities that cater to
            students&apos; needs. Our geo-location integration ensures that job
            options are conveniently located near their campus or residence. The
            platform&apos;s user-friendly interface and time-efficient search process
            set it apart, making it the ideal choice for students looking to
            balance work and academics seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
