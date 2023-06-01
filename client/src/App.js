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

	const [property, serProperty] = useState({
		"apartmentNumber": "",
		"avg_ratings": [1, 1, 1, 1, 1, 1],
		"city": "San Luis Obispo",
		"country": "United States",
		"fullAddress": "1237 Monte Vista Pl. Apt. 11, San Luis Obispo, CA 93405",
		"landlordName": "Fiona",
		"lat": -120.663216,
		"long": 35.295945,
		"monthlyCostRange": "$500-999",
		"num_revs": 1,
		"state": "CA",
		"streetName": "1237 Monte Vista Pl. Apt. 11",
		"zipCode": "93405",
		"__v": 0,
		"_id": "6477979c6f4b7321de81f4d3"
	  }
	)

	const updateProperty = (newProperty) => {
		serProperty(newProperty);
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
					<Route path="/reviews" element={<Reviews updateProperty={updateProperty}/>} />
					<Route path="/view-reviews" element={<ViewReviews property={property}/>} />
				</Routes>
				{isPopupVisible && <LoginSignupPage onClose={handleClosePopup} />}
			</div>
		</Router>
	);
}

export default App;