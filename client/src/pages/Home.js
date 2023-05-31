import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const addressInput = document.getElementById("input");

		const handleKeyDown = (event) => {
		  if (event.key === "Enter") {
			event.preventDefault();
			const address = addressInput.value;
			navigate("/reviews", { state: { address: address } });
		  }
		};

		addressInput.addEventListener("keydown", handleKeyDown);

		return () => {
		  addressInput.removeEventListener("keydown", handleKeyDown);
		};
	  }, []);

	return (
		<div className="homepage">
			<div className="background-image">
				<div className="content">
					<h1>Where renters and properties meet excellence.</h1>
					<div className="search-bar">
						<input id = "input" type="text" placeholder="Search an address here..." />
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
