import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer__img-wrapper">
          <img src={logo} alt="" className="footer-img" />
        </div>
        <ul className="footer__links">
          <li className="footer__list">
            <Link to="/" className="footer__link" onClick={scrollToTop}>
              Home
            </Link>
          </li>
          <li className="footer__list">
            <Link to="/jobs" className="footer__link" onClick={scrollToTop}>
              Jobs
            </Link>
          </li>
          <li className="footer__list">
            <Link to="/about" className="footer__link" onClick={scrollToTop}>
              About
            </Link>
          </li>
          <li className="footer__list">
            <Link to="/map" className="footer__link" onClick={scrollToTop}>
              Map
            </Link>
          </li>
          <li className="footer__list">
            <Link to="/account" className="footer__link" onClick={scrollToTop}>
              Account
            </Link>
          </li>
        </ul>
        <div className="copyright-wrapper">
            <p className="copyright-text">© 2024 StudentGeoJobSearch</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
