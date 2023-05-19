import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="homepage">
      <div className="background-image">
        <div className="content">
          <h1>Where renters and properties meet excellence.</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search an address here..." />
          </div>
        </div>
        <Link to="/write-review" className="write-review-button">
          Write A Review
        </Link>
      </div>
    </div>
  );
}

export default Home;
