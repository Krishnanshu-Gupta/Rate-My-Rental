import "./Reviews.css";
import  "./ViewReview.css"
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

import data from './example.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke as starHalf, faStar as starFull, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as starEmpt} from '@fortawesome/free-regular-svg-icons';



function Review() {
	const markerRef = useRef([-120.6596, 35.2828]);
	const [markerPosition, setMarkerPosition] = useState(markerRef.current);
	const [address, setAddress] = useState("");
	const [selected, setSelected] = useState(-1);

<<<<<<< Updated upstream:client/src/Reviews.js
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
				//console.log('Coordinates:', longitude, latitude);
				return [longitude, latitude];
		  } else {
				//console.log('No coordinates found for the given address.');
				return [];
		  }
		} catch (error) {
		  //console.error('Error converting address to coordinates:', error);
		  return [];
		}
	};
=======
	const [listOfProperties, setListOfProperties] = useState([]);

	const location = useLocation();
	const addressToAutofill = location.state.address;
>>>>>>> Stashed changes:client/src/pages/Reviews.js


	useEffect(() => {
		mapboxgl.accessToken = "pk.eyJ1Ijoia3Jpc2huYW5zaHUiLCJhIjoiY2xoang2a29nMG04MjNpbXQ3MmRoNWw3ZyJ9.i4zaDfrRa3VIWW3FAuAFtw";
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-120.6596, 35.2828],
			zoom: 13
		});

		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			language: 'en',
			bbox: [-121.438176, 34.897475, -119.472489, 35.796655]
			//proximity: "-120.6596, 35.2828",
		});

		var marker = new mapboxgl.Marker({ color: 'red', draggable: true })
			.setLngLat(new mapboxgl.LngLat(markerRef.current[0], markerRef.current[1]))

		function onDragEnd() {
			const lngLat = marker.getLngLat();
			markerRef.current = [lngLat.lng, lngLat.lat];
			setMarkerPosition(markerRef.current);
		}
		var tempList = []
		Axios.get("http://localhost:3001/getProperties").then((response) => {
			//console.log(response.data);
      		setListOfProperties(response.data);
			tempList = response.data
			//console.log(listOfProperties);
    	});

		map.addControl(new mapboxgl.NavigationControl());
		map.addControl(geocoder, 'top-left');

		geocoder.on('result', function (result) {
			//console.log(result.result.place_name)
			setAddress(result.result.place_name);
			markerRef.current = result.result.center;
			setMarkerPosition(markerRef.current);
			marker.remove(map)
			marker = new mapboxgl.Marker({ color: 'red', draggable: true })
				.setLngLat([markerRef.current[0], markerRef.current[1]])
				.addTo(map);
		})

		map.on('load', () => {
			map.loadImage(
				'https://cdn-icons-png.flaticon.com/64/3203/3203002.png',
				(error, image) => {
				if (error) throw error;
					map.addImage('custom-marker', image);
				}
			);
			const properties = [];
			tempList.forEach((property) => {//data.properties.forEach((property, i) => {
				var coords = [property.lat, property.long];
				const marker = {
					type: 'Feature',
					properties: {
						description: `<h3>${property.landlordName}</h3><h4>${property.fullAddress}</h4>`,
						id: property._id
					},
					geometry: {
						type: 'Point',
						coordinates: coords,
					},
				};
				properties.push(marker);
			});

			map.addSource('places', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': properties
				}
			});
			// Add a layer showing the places.
			map.addLayer({
				'id': 'places',
				'type': 'circle',
				'source': 'places',
				'paint': {
					'circle-color': '#4264fb',
					'circle-radius': 8,
					'circle-stroke-width': 2,
					'circle-stroke-color': '#ffffff'
				}
			});

			// Create a popup, but don't add it to the map yet.
			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('click', 'places', (e) => {
				const description = e.features[0].properties.description;
				setSelected(e.features[0].properties.id)
				scrollToSelectedReviewBox(e.features[0].properties.id)
			})

			map.on('mouseenter', 'places', (e) => {
				map.getCanvas().style.cursor = 'pointer';
				const coordinates = e.features[0].geometry.coordinates.slice();
				const description = e.features[0].properties.description;
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180)
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				popup.setLngLat(coordinates).setHTML(description).addTo(map);
			});
			map.on('mouseleave', 'places', () => {
				map.getCanvas().style.cursor = '';
				popup.remove();
				setSelected(-1);
			});
		});
	}, []);

	function scrollToSelectedReviewBox(selected) {
		const selectedReviewBox = document.getElementById(`review-box-${selected}`);
		if (selectedReviewBox) {
		  selectedReviewBox.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<div className="Reviews">
			<div className="review-container">
				<div className="column left">
					<div className="map" id="map" />
				</div>
				<div className="column right">
<<<<<<< Updated upstream:client/src/Reviews.js
					<>{/*
					<div className='filters'>
						<Accordion>
							<AccordionSummary
							style = {{textAlign: "center"}}
							disableGutters={false}
							expandIcon={<TuneIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							>
								<Typography align="center" sx={{width: '100%', height: '100%', fontWeight: 'bold'}} variant="h6">Filter Rentals</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<div style = {{display: "flex", flexDirection: "row"}}>
									<div style = {{display: "flex", flexDirection: "column"}}>
										<Typography sx = {{fontWeight: '600'}}>Overall Rating:</Typography>
										<button className="filter-rating-stars" style={{ background: 'none', border: 'none', paddingTop: 0, cursor: 'pointer' }}>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9734;</span>
											<span style={{color: "black", fontSize: '15px'}}>{' & Up'}</span>
										</button>
										<button className="filter-rating-stars" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span style={{color: "black", fontSize: '15px'}}>{' & Up'}</span>
										</button>
										<button className="filter-rating-stars" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
											<span>&#9733;</span>
											<span>&#9733;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span style={{color: "black", fontSize: '15px'}}>{' & Up'}</span>
										</button>
										<button className="filter-rating-stars" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
											<span>&#9733;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span>&#9734;</span>
											<span style={{color: "black", fontSize: '15px'}}>{' & Up'}</span>
										</button>
									</div>
								</div>
							</AccordionDetails>
						</Accordion>
					</div>
					*/}</>
=======
>>>>>>> Stashed changes:client/src/pages/Reviews.js
					<div className="view-reviews">
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
									<div className="review-main">
										<div className="review-name">
											<div style = {{fontWeight: '600', fontSize: "18px"}}>{property.landlordName}</div>
											<div style = {{paddingTop: "3px"}}>Total Reviews: {property.num_revs}</div>

<<<<<<< Updated upstream:client/src/Reviews.js
											<div className = "price-range" style = {{paddingTop: "40px"}}>${property["price-range"]}</div>
=======
											{property.monthlyCostRange !== "" && <div className = "price-range" style = {{paddingTop: "40px"}}>{property.monthlyCostRange}</div>}
>>>>>>> Stashed changes:client/src/pages/Reviews.js
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
						{listOfProperties.map((property) => (
							<div style = {{display: "flex", flexDirection: "row"}}>
								<div id={`review-box-${property._id}`} className="review-box" style={{ border: selected === property._id ? "3px solid #91c949" : "",}}>
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
									<div className="review-address">
										<div >{property.fullAddress}</div>
										<button style = {{alignItems: "flex-end", marginLeft: "5px"}} className="visit-button">View Reviews</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Review;