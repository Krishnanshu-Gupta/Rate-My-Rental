import React, { useState, useEffect } from 'react';
import './ViewReviews.css';
// import { properties } from '../components/propertiesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke as starHalf, faStar as starFull, faFlag, faSquareCaretLeft} from '@fortawesome/free-solid-svg-icons';
import { faStar as starEmpt, faSquareArrowLeft} from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Popup from 'reactjs-popup';

import { useLocation, useNavigate, Link } from "react-router-dom";

function ViewReviews() {
	const location = useLocation();
	const navigate = useNavigate();

	const property = location.state.property;

	const [properties, setProperties] = useState([])
	const [reportText, setReportText] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/getReviews')
		.then(response => {
			const reviews = response.data;
			//console.log("REVIEWS:", reviews)
			setProperties(reviews);
		})
		.catch(error => {
			console.error('Error retrieving reviews:', error);
		});
	}, []);

	//console.log("PROPERTIES: ", properties)

	const filteredProperties = properties.filter(
		(prop) => prop.propertyId === property._id
	);

	const renderStarRating = (rating) => {
		const fullStars = '★'.repeat(rating);
		const emptyStars = '☆'.repeat(5 - rating);
		return (
		<span className="star-rating">
			<span className="full-stars">{fullStars}</span>
			<span className="empty-stars">{emptyStars}</span>
		</span>
		);
	};

	function handleReport(){
		console.log(reportText)
	}

  	return (
		<div className="property-container">
			<div style = {{position: "fixed", padding: "10px", left: "0px", display: "flex", flexDirection: "row"}}
				onClick = {() => navigate("/reviews")}
			>
				<FontAwesomeIcon icon={faSquareCaretLeft} size = "lg"/>
				<div style = {{paddingLeft: "5px", paddingTop: "1px"}}>Back</div>
			</div>
			<div className="title-address">
				<div>{property.fullAddress}</div>
			</div>
			<div style = {{display: "flex", flexDirection: "row", padding: "10px"}}>
				<div id={`review-box-${property._id}`} className="review-box">
					<div className="review-main">
						<div className="review-name">
							<div style = {{fontWeight: '600', fontSize: "18px"}}>{property.landlordName}</div>
							<div style = {{paddingTop: "3px"}}>Total Reviews: {property.num_revs}</div>
							{property.monthlyCostRange !== "" && <div className = "price-range" style = {{paddingTop: "40px"}}>{property.monthlyCostRange}</div>}
						</div>
						<div className="review-categs">
							<span className="rating-stars">
								<div className="review-stars-text">Overall</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[0])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[0] - Math.floor(property.avg_ratings[0]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[0]) +
											Math.ceil(property.avg_ratings[0] - Math.floor(property.avg_ratings[0]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
							<span className="rating-stars">
								<div className="review-stars-text">Safety</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[1])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[1] - Math.floor(property.avg_ratings[1]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[1]) +
											Math.ceil(property.avg_ratings[1] - Math.floor(property.avg_ratings[1]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
							<span className="rating-stars">
								<div className="review-stars-text">Repairs</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[2])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[2] - Math.floor(property.avg_ratings[2]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[2]) +
											Math.ceil(property.avg_ratings[2] - Math.floor(property.avg_ratings[2]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
							<span className="rating-stars">
								<div className="review-stars-text">Respect</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[3])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[3] - Math.floor(property.avg_ratings[3]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[3]) +
											Math.ceil(property.avg_ratings[3] - Math.floor(property.avg_ratings[3]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
							<span className="rating-stars">
								<div className="review-stars-text">Location</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[4])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[4] - Math.floor(property.avg_ratings[4]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[4]) +
											Math.ceil(property.avg_ratings[4] - Math.floor(property.avg_ratings[4]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
							<span className="rating-stars">
								<div className="review-stars-text">Amenities</div>
								<div style = {{paddingTop: "5px"}}>
									{[
										...Array(Math.floor(property.avg_ratings[5])).fill(<FontAwesomeIcon icon={starFull} color = "orange"/>),
										...Array(Math.ceil(property.avg_ratings[5] - Math.floor(property.avg_ratings[5]))).fill(<FontAwesomeIcon icon={starHalf} color = "orange"/>),
										...Array(5 - (
											Math.floor(property.avg_ratings[5]) +
											Math.ceil(property.avg_ratings[5] - Math.floor(property.avg_ratings[5]))
										)).fill(<FontAwesomeIcon icon={starEmpt} color = "orange"/>)
									]}
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
			<h3>Reviews</h3>
			{console.log("FILTERED:", filteredProperties)}
			{filteredProperties.map((property) => (
				<div style = {{flexDirection: "row", display: "flex"}}>
					<div className="property-box" key={property._id.$oid}>
						<div className="property-info">
							<div className="left-half">
								<div className="ratings-section">
									<div className="rating">
										<p className="overall-rating">Overall Rating:</p>
										<p>{renderStarRating(property.overallRating)}</p>
									</div>
									<div className="rating">
										<p>Health and Safety:</p>
										<p>{renderStarRating(property.healthAndSafetyRating)}</p>
									</div>
									<div className="rating">
										<p>Repairs Rating:</p>
										<p>{renderStarRating(property.repairsRating)}</p>
									</div>
								</div>
							</div>
							<div className="right-half">
								<div className="rating">
									<p>Respect Rating:</p>
									<p>{renderStarRating(property.respectRating)}</p>
								</div>
								<div className="rating">
									<p>Location Rating:</p>
									<p>{renderStarRating(property.locationRating)}</p>
								</div>
								<div className="rating">
									<p>Amenities Rating:</p>
									<p>{renderStarRating(property.amenitiesRating)}</p>
								</div>
							</div>
						</div>
						<div className="written-review">
							<h3>Written Review</h3>
							<p>{property.writtenReview}</p>
						</div>
					</div>
					<div style = {{paddingLeft: "20px", margin: "auto"}}>
						<Popup trigger={<button><FontAwesomeIcon icon={faFlag} color = "#1E3054"/></button>} modal>
							{close => (
								<div style = {{backgroundColor: "white"}}>
									<div className = "modal" style = {{display: "flex", flexDirection: "column", padding: "20px", height: "50vh", width: "50vw"}}>
										<button className="close" onClick = {close}>&times;</button>
										<div style = {{textAlign: "center", fontSize: "30px", fontWeight: "600", color: "#1f1f1f", fontFamily: "'Google Sans', 'Google Sans Text', Roboto, sans-serif"}}>Report a Review</div>
										<div style = {{width: "100%", height: "100%", boxSizing: "border-box", padding: "20px"}}>
											<textarea value={reportText} onChange={(e) => setReportText(e.target.value)}
												placeholder = "Please describe why this review is inappropriate or inaccurate, and include any linked documents here..."
												style = {{width: "100%", height: "100%", boxSizing: "border-box", padding: "10px"}}/>
										</div>
										<button onClick = {() => {
											handleReport();
											close();}} style = {{width: "100px", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: "500", border: "0.0625rem solid transparent", margin: "auto", padding: "10px", backgroundColor: "#0b57d0", color: "white"}}>Submit</button>
									</div>
								</div>
							)}
						</Popup>
					</div>
				</div>
			))}
		</div>
  	);
}

export default ViewReviews;