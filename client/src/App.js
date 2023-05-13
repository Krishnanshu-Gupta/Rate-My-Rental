import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WriteReview from "./pages/writeReview";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/write-review" element={<WriteReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
