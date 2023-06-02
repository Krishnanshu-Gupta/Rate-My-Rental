import "./App.css";
import { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginSignupPage from "./components/LoginSignupPage";
import Reviews from "./pages/Reviews";
import WriteReview from "./pages/writeReview";
import Home from "./pages/Home";
import ViewReviews from "./pages/ViewReviews";

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

	return (
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
					<Route path="/write-review" element={<WriteReview />} />
					<Route path="/reviews" element={<Reviews updateProperty={updateProperty}/>} />
					<Route path="/view-reviews" element={<ViewReviews property={property}/>} />
				</Routes>
				{isPopupVisible && <LoginSignupPage onClose={handleClosePopup} />}
			</div>
		</Router>
	);
}

export default App;