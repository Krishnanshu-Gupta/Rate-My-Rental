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

	const goHome = () => {
		<Navigate to = "/" />
	};

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

	const handleClick = () => {
		alert('Coming Soon!');
	};

	const handleSignOutClick = () => {
		setAttemptLogin(false);
		alert('You have been signed out!');
	};

	return (
		<AuthContext.Provider value={{ attemptLogin, setAttemptLogin }}>
		<Router>
			<nav className="navbar">
				<Link to="/" className="btn-home" style={{ fontWeight: 600 }}>
					Home
				</Link>
				<h1 className="brand">RateMyRental</h1>
				<Link to="/" className="btn-home" style={{ fontWeight: 600 }} onClick={handleClick}>
					About Us
				</Link>
				<Link to="/" className="btn-home" style={{ fontWeight: 600 }} onClick={handleClick}>
					Help
				</Link>
				{attemptLogin ? (
					<Link to="/" className="btn-home" style={{ fontWeight: 600 }} onClick={handleSignOutClick}>
						Sign Out
					</Link>
				) : (
					<Link to="/" className="btn-home" style={{ fontWeight: 600 }} onClick={handleSignInClick}>
						Sign in
					</Link>
				)}
			</nav>
			<div className="page-container">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/home" element={<Home />} />
					{/* <Route path="/write-review" element={<WriteReview />} /> */}
					{attemptLogin ? (
						<Route path="/write-review" element={<WriteReview />} />
						) : (
							<Route
								path="/write-review"
								element={<div style={{ textAlign: "center", fontSize: "20px", margin: "30px"}}>
											<div style={{ textAlign: "center", fontSize: "20px", paddingTop: "30px", paddingBottom: "20px"}}>Please Sign In to Write a Review</div>
											<Link to="/" className="btn-home" style={{
												display: 'inline-block',
												padding: '10px 20px',
												backgroundColor: '#f0f0f0',
												color: 'black',
												fontWeight: 600,
												textDecoration: 'none',
												border: '1px solid #ccc',
												borderRadius: '4px',
												cursor: 'pointer',
											}}>Home</Link>
										</div>}
							/>
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