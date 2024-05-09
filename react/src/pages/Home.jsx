import React from "react";
import PropTypes from 'prop-types';
import "../styles/Home.css";
import homeImage from "../assets/homeimage.svg";
import { FaSearch } from "react-icons/fa";

function Home({inputValue, setInputValue}) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //setInputValue(event.target.value);
      window.location.href = "/jobs";
    }
  };

  const handleSearchClick = () => {
    window.location.href = "/jobs";
  }

  return (
    <div className="home-wrapper">
      <div className="home__header">
        Find Your Dream Job With StudentGeoJobSearch
      </div>
      <div className="home__search--wrapper">
        <input
          type="text"
          placeholder="Search by job title"
          className="home__search-bar"
          onKeyDown={handleKeyPress}
        />
        <div className="home__search-clicker" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
      <div className="img__wrapper">
        <img className="home-img" src={homeImage} alt="" />
      </div>
    </div>
  );
}

Home.propTypes = {
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
};

export default Home;
