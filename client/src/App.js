import "./App.css";
import { useState, useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginSignupPage from "./components/LoginSignupPage";
import Reviews from "./pages/Reviews";
import WriteReview from "./pages/writeReview";
import Home from "./pages/Home";
import ViewReviews from "./pages/ViewReviews";

import AuthContext from "./components/AuthContext";
function App() {
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	const handleClosePopup = () => {
		setIsPopupVisible(false);
	};

	const handleSignInClick = () => {
		setIsPopupVisible(true);
	};

	const [property, serProperty] = useState({})

	const updateProperty = (newProperty) => {
		serProperty(newProperty);
	};
	const [attemptLogin, setAttemptLogin] = useState(false);

	return (
		<AuthContext.Provider value={{ attemptLogin, setAttemptLogin }}>
		<Router>
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
			<div className="page-container">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/home" element={<Home />} />
					{/* <Route path="/write-review" element={<WriteReview />} /> */}
					{attemptLogin ? (
					<Route
						path="/write-review"
						element={<WriteReview />}
					/>
					) : (
					<Route path="/write-review" element={<Navigate to="/" />} />
					)}
					<Route path="/reviews" element={<Reviews updateProperty={updateProperty}/>} />
					<Route path="/view-reviews" element={<ViewReviews property={property}/>} />
				</Routes>
				{isPopupVisible && <LoginSignupPage onClose={handleClosePopup} />}
			</div>
		</Router>
		</AuthContext.Provider>
	);
}

export default App;