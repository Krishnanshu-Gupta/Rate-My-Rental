import React, { useState, useEffect } from 'react';
import "./writeReview.css"
import Axios from "axios";
import { create } from 'domain';
import { Link, useNavigate } from "react-router-dom";

function WriteReview() {
	const navigate = useNavigate();
	const [listOfReviews, setListOfReviews] = useState([]);
	const [listOfProperties, setListOfProperties] = useState([]);

	const [landlordName, setLandlordName] = useState("");
	const [streetName, setStreetName] = useState("");
	const [apartmentNumber, setApartmentNumber] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [zipCode, setZipCode] = useState("");

	const [linkProof, setLinkProof] = useState("");
	const [overallRating, setOverallRating] = useState(0);
	const [healthAndSafetyRating, setHealthAndSafetyRating] = useState(0);
	const [repairsRating, setRepairsRating] = useState(0);
	const [respectRating, setRespectRating] = useState(0);
	const [locationRating, setLocationRating] = useState(0);
	const [amenitiesRating, setAmenitiesRating] = useState(0);
	const [writtenReview, setWrittenReview] = useState("");

	const [monthlyCostRange, setMonthlyCostRange] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);


	const handleMonthlyCostRangeChange = (range) => {
		setMonthlyCostRange(range);
		setShowDropdown(false);
	};


	const handleOverallRating = (rating) => {
		setOverallRating(rating);
	};
	const handleHealthAndSafetyRating = (rating) => {
		setHealthAndSafetyRating(rating);
	};

	const handleRepairsRating = (rating) => {
		setRepairsRating(rating);
	};

	const handleRespectRating = (rating) => {
		setRespectRating(rating);
	};

	const handleLocationRating = (rating) => {
		setLocationRating(rating);
	};

	const handleAmenitiesRating = (rating) => {
		setAmenitiesRating(rating);
	};

	const handleWrittenReviewChange = (event) => {
		setWrittenReview(event.target.value);
	};

	useEffect(() => {
		Axios.get("http://localhost:3001/getReviews").then((response) => {
			setListOfReviews(response.data);
		});
		Axios.get("http://localhost:3001/getProperties").then((response) => {
			setListOfProperties(response.data);
		});
	}, []);

	const convertAddressToCoordinates = async (address) => {
		const MAPBOX_API_KEY = 'pk.eyJ1Ijoia3Jpc2huYW5zaHUiLCJhIjoiY2xoang2a29nMG04MjNpbXQ3MmRoNWw3ZyJ9.i4zaDfrRa3VIWW3FAuAFtw'; // Replace with your Mapbox API key

				try {
					const response = await Axios.get(
						`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
							address
						)}.json?access_token=${MAPBOX_API_KEY}`
					);

					if (response.status === 200 && response.data.features.length > 0) {
						const center = response.data.features[0].center;
						//console.log(response)
						const longitude = center[0];
						const latitude = center[1];

						// Use the coordinates for further processing
						console.log('Coordinates:', longitude, latitude);
						return [longitude, latitude];
					} else {
						console.log('No coordinates found for the given address.');
						return [];
					}
				} catch (error) {
					//console.error('Error converting address to coordinates:', error);
					return [];
				}
			};

	const updateProperty = (propertyId, updatedData) => {
		Axios.put(`http://localhost:3001/updateProperty/${propertyId}`, updatedData)
		.then((response) => {
			// Handle the response if needed
			// console.log("Property updated successfully");
			// const updatedProperty = response.data;
			// setListOfProperties((prevList) => {
			//   const updatedList = prevList.map((property) => {
			//     if (property._id === updatedProperty._id) {
			//       return updatedProperty;
			//     }
			//     return property;
			//   });
			//   return updatedList;
			// });
			createReview(propertyId).then(() => {
				return propertyId;
			}).catch((error) => {
				console.log(error);
			});
		})
		.catch((error) => {
			// Handle errors if any
			console.error("Error updating property", error);
		});
	}
	const createProperty = async () => {
		console.log(listOfProperties);

		//Check to see whether property is already in DB
		const street = listOfProperties.filter((obj) => {
			return (
				obj.streetName.toLowerCase().includes(streetName.toLowerCase())
			);
		});
		console.log(street);

		if(street.length > 0){
			console.log("PROPERTY FOUND!!!!");
			console.log("in Property, id is: " + street[0]._id);

			var fullAddress = street[0].streetName + " " + street[0].city + " " + street[0].state + " " + street[0].zipCode;
			convertAddressToCoordinates(fullAddress);

			var currRevs = street[0].num_revs + 1;
			var updatedRats = [overallRating, healthAndSafetyRating, repairsRating, respectRating, locationRating, amenitiesRating];

			for(let i = 0; i < street[0].avg_ratings.length; i++) {
				const val = street[0].avg_ratings[i];
				const new_rat = (((currRevs - 1) * val) + updatedRats[i]) / currRevs;
				updatedRats[i] = new_rat;
			}
			console.log("num revs currently " + currRevs);

			const updatedData = {
				num_revs: currRevs,
				avg_ratings: updatedRats,
			}

			updateProperty(street[0]._id, updatedData).then(() => {
				// createReview(street[0]._id).then(() => {
				//   return street[0]._id;
				// }).catch((error) => {
				//   console.log(error);
				// });
			});
		}
		else{
			const fullAddress = streetName + ", " + city + ", " + state + " " + zipCode;
			const coords = await convertAddressToCoordinates(fullAddress);
			const lat = coords[0];
			const long = coords[1];
			const num_revs = 1;
			const avg_ratings = [overallRating, healthAndSafetyRating, repairsRating, respectRating, locationRating, amenitiesRating];
			console.log("monthly cost range: " + monthlyCostRange);
			console.log("full addy is " + fullAddress);
			console.log("coord is " + coords);
			Axios.post("http://localhost:3001/createProperty", {
				fullAddress,
				num_revs,
				avg_ratings,
				landlordName,
				streetName,
				apartmentNumber,
				city,
				state,
				country,
				zipCode,
				monthlyCostRange,
				lat,
				long
			}).then((response) => {
				setListOfProperties([
					...listOfProperties,
					{
						fullAddress,
						num_revs,
						avg_ratings,
						landlordName,
						streetName,
						apartmentNumber,
						city,
						state,
						country,
						zipCode,
						monthlyCostRange,
						lat,
						long
					},
				]);


				console.log("Hi this is in create Property, " + response.data._id);
				console.log(listOfProperties);

				createReview(response.data._id).then(() => {
					return response.data._id;
				});

			}).catch((error) => {
				console.log(error);
			});
		}

	};

	const createReview = (propertyId) => {
		console.log("This is the property id given, " + propertyId);
		Axios.post("http://localhost:3001/createReview", {
			overallRating,
			healthAndSafetyRating,
			repairsRating,
			respectRating,
			locationRating,
			amenitiesRating,
			writtenReview,
			linkProof,
			propertyId,
		}).then((response) => {
			setListOfReviews([
				...listOfReviews,
				{
					overallRating,
					healthAndSafetyRating,
					repairsRating,
					respectRating,
					locationRating,
					amenitiesRating,
					writtenReview,
					linkProof,
					propertyId,
				},
			]);
			navigate("/");
			return response.insertedId;
		});

	};


	return (
		<div className="container">
			<h1>Write a Review</h1>
				<div className="form-group">
					<label htmlFor="landlordName">Landlord Name:</label>
					<input
						type="text"
						id="landlordName"
						name="landlordName"
						className="form-control"
						value={landlordName}
						onChange={(event) => {
							setLandlordName(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="streetName">Street Name:</label>
					<input
						type="text"
						id="streetName"
						name="streetName"
						className="form-control"
						value={streetName}
						onChange={(event) => {
							setStreetName(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="apartmentNumber">Apartment Number:</label>
					<input
						type="text"
						id="apartmentNumber"
						name="apartmentNumber"
						className="form-control"
						value={apartmentNumber}
						onChange={(event) => {
							setApartmentNumber(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="city">City:</label>
					<input
						type="text"
						id="city"
						name="city"
						className="form-control"
						value={city}
						onChange={(event) => {
							setCity(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="state">State:</label>
					<input
						type="text"
						id="state"
						name="state"
						className="form-control"
						value={state}
						onChange={(event) => {
							setState(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="country">Country:</label>
					<input
						type="text"
						id="country"
						name="country"
						className="form-control"
						value={country}
						onChange={(event) => {
							setCountry(event.target.value);
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="zipCode">Zip Code:</label>
					<input
						type="text"
						id="zipCode"
						name="zipCode"
						className="form-control"
						value={zipCode}
						onChange={(event) => {
							setZipCode(event.target.value);
						}}
					/>
				</div>
				<div className="document-upload">
					<h3>Prove your stay</h3>
					<p>Please submit a link to a document that proves your stay as a tenant:</p>
					<input
						type="text"
						id="linkProof"
						name="linkProof"
						className="form-control"
						value={linkProof}
						onChange={(event) => {
							setLinkProof(event.target.value);
						}}
					/>
				</div>

				<div>
			<h2>Review Your Stay</h2>
			<div className="form-group">
					<label htmlFor="monthlyCostRange">Monthly Cost Range:</label>
					<div className="dropdown">
						<button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
							{monthlyCostRange ? monthlyCostRange : 'Select a range'} <span>&#9662;</span>
						</button>
						{showDropdown && (
							<ul className="dropdown-list">
								<li onClick={() => handleMonthlyCostRangeChange('$0-499')}>$0-499</li>
								<li onClick={() => handleMonthlyCostRangeChange('$500-999')}>$500-999</li>
								<li onClick={() => handleMonthlyCostRangeChange('$1000-1499')}>$1000-1499</li>
								<li onClick={() => handleMonthlyCostRangeChange('$1500-1999')}>$1500-1999</li>
								<li onClick={() => handleMonthlyCostRangeChange('$2000-2499')}>$2000-2499</li>
								<li onClick={() => handleMonthlyCostRangeChange('$2500-2999')}>$2500-2999</li>
								<li onClick={() => handleMonthlyCostRangeChange('$3000 or more')}>$3000 or more</li>
							</ul>
						)}
					</div>
				</div>
			<div className="rating-section">
					<h3>Overall Rating</h3>
					<p>Give your overall rating of this location!</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									overallRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleOverallRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="rating-section">
					<h3>Health and Safety</h3>
					<p>Complies with local health and safety standards</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									healthAndSafetyRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleHealthAndSafetyRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="rating-section">
					<h3>Repairs</h3>
					<p>Kept the premises safe and in good condition</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									repairsRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleRepairsRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="rating-section">
					<h3>Respect</h3>
					<p>
						Respect the tenant and their privacy, and act in a cordial manner.
					</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									respectRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleRespectRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="rating-section">
					<h3>Location</h3>
					<p>Has an ideal location relative to most other properties in town</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									locationRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleLocationRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="rating-section">
					<h3>Amenities</h3>
					<p>Additions that are in excess of the basic needs (pools, workout facilities, internet, etc.)</p>
					<div className="rating-buttons">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								className={`rating-button ${
									amenitiesRating === rating ? "selected" : ""
								}`}
								type="button"
								onClick={() => handleAmenitiesRating(rating)}
							>
								{rating}
							</button>
						))}
					</div>
				</div>
				<div className="review-section">
					<h3>Written Review</h3>
					<textarea
						className="review-textarea"
						value={writtenReview}
						onChange={handleWrittenReviewChange}
					/>
				</div>
				<button className="submit-button" onClick={createProperty} >
					Submit Review
				</button>
		</div>



		</div>
	);

}

export default WriteReview;