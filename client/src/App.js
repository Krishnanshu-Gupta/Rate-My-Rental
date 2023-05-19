import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewReviews from "./pages/ViewReviews";
import WriteReview from "./pages/writeReview";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="page-container">
      <nav className="navbar">
          <Link to="/" className="btn-home" style={{ fontWeight: 600 }}>
            Home
          </Link>
          <h1 className="brand">RateMyRental</h1>
          <Link to="/" className="btn-home" style={{ fontWeight: 600 }}>
            About Us
          </Link>
          <Link to="/" className="btn-home" style={{ fontWeight: 600 }}>
            Help
          </Link>
          <Link to="/" className="btn-home" style={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </nav>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/view-reviews" element={<ViewReviews />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
