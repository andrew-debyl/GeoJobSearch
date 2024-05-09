import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Nav.css"

function Nav() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="nav--container">
      <nav className="nav">
        <div className="nav__img-container">
          <Link to="/" onClick={scrollToTop}>
            <img src={logo} alt="" className="nav__img" />
          </Link>
        </div>
        <ul className="nav__links">
          <li className="nav__list">
            <Link to='/' className="nav__link" onClick={scrollToTop}>
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link to='/jobs' className="nav__link" onClick={scrollToTop}>
              Jobs
            </Link>
          </li>
          <li className="nav__list">
            <Link to='/about' className="nav__link" onClick={scrollToTop}>
              About
            </Link>
          </li>
          <li className="nav__list">
            <Link to='/map' className="nav__link" onClick={scrollToTop}>
              Map
            </Link>
          </li>
          <li className="nav__list">
            <Link to='/account' className="account" onClick={scrollToTop}>
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
