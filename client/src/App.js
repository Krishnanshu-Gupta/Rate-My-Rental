import "./App.css";
import { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginSignupPage from "./components/LoginSignupPage";
import ViewReviews from "./pages/ViewReviews";
import WriteReview from "./pages/writeReview";
import Home from "./pages/Home";
import AllReviews from "./pages/AllReviews";


function App() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

const handleClosePopup = () => {
  setIsPopupVisible(false);
};

const handleSignInClick = () => {
  setIsPopupVisible(true);
};

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
          <Link to="/" className="btn-home" style={{ fontWeight: 600 }} onClick={handleSignInClick}>
            Sign in
          </Link>
        </nav>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/view-reviews" element={<ViewReviews />} /> 
          <Route path="/all-reviews" element={<AllReviews property_id="64753dfa59ddea2af496a4ba" />} /> 
        </Routes>
        {isPopupVisible && <LoginSignupPage onClose={handleClosePopup} />}

      </div>
    </Router>
  );
}

export default App;