import React from 'react';
import "./App.css";
import Home from "./pages/Home";
import JobBoard from "./pages/JobBoard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import About from "./pages/About";
import Account from "./pages/Account";
import SpecificJob from "./pages/SpecificJob";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import BigMap from './pages/BigMap';

function App() {
  const [inputValue, setInputValue] = useState("");

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobData(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home inputValue={inputValue} setInputValue={setInputValue} />
            }
          />
          <Route path="/jobs" exact element={<JobBoard jobData={jobData} />} />
          <Route path="/jobs/:jobId" exact element={<SpecificJob jobData={jobData} />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/map" exact element={<BigMap jobData={jobData} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
