import "./Reviews.css";
import  "./ViewReview.css"
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';

import data from './example.json';

function App() {
	const markerRef = useRef([-120.6596, 35.2828]);
	const [markerPosition, setMarkerPosition] = useState(markerRef.current);
	const [address, setAddress] = useState("");

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
			mapboxgl: mapboxgl
		});

		var marker = new mapboxgl.Marker({ color: 'red', draggable: true })
			.setLngLat(new mapboxgl.LngLat(markerRef.current[0], markerRef.current[1]))
			.addTo(map);

		function onDragEnd() {
			const lngLat = marker.getLngLat();
			markerRef.current = [lngLat.lng, lngLat.lat];
			setMarkerPosition(markerRef.current);
		}

		marker.on('dragend', onDragEnd);

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
			marker.on('dragend', onDragEnd);
		})

		map.on('load', () => {
			map.loadImage(
				'https://cdn-icons-png.flaticon.com/64/3203/3203002.png',
				(error, image) => {
				if (error) throw error;
					map.addImage('custom-marker', image);
				}
			);
			const features = []
			data.properties.forEach(property => {
				const marker = {
					type: 'Feature',
					properties: {
						description: `<strong>${property.name}</strong><p>${property.address}</p>`,
					},
					geometry: {
						type: 'Point',
						coordinates: property.coordinates,
					},
				};
				features.push(marker)
			});

			map.addSource('places', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': features
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

			/*
			map.addLayer({
				'id': 'places',
				'type': 'symbol',
				'source': 'places',
				'layout': {
					'icon-image': 'custom-marker',
					'icon-size': 0.70,
					'text-field': ['get', 'title'],
					'text-font': [
						'Open Sans Semibold',
						'Arial Unicode MS Bold'
					],
					'text-offset': [0, 1.25],
					'text-anchor': 'top'
				}
			}); */

			// Create a popup, but don't add it to the map yet.
			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false
			});

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
			});
		});
	}, []);

	return (
		<div className="App">
			<div style={{height: '84px', width: '100%',  backgroundColor: 'green'}}>
				<div style={{color: 'green'}}></div>
			</div>
			<div className="review-container">
				<div className="column left">
					<div className="map" id="map" />
				</div>
				<div className="column right" style = {{overflowY: "auto"}}>
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
					<div className="view-reviews">
						{data.properties.map((property) => (
							<div className="review-box">
								<div className="review-main">
									<div className="review-name">
										<div style = {{fontWeight: '600', fontSize: "18px"}}>{property.name}</div>
										<div style = {{paddingTop: "3px"}}>Total Reviews: {property.num_revs}</div>
									</div>
									<div className="review-categs">
										<span className="rating-stars">
											<div className="review-stars-text">Overall</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[0])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[0])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
										<span className="rating-stars">
											<div className="review-stars-text">Safety</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[1])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[1])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
										<span className="rating-stars">
											<div className="review-stars-text">Repairs</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[2])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[2])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
										<span className="rating-stars">
											<div className="review-stars-text">Respect</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[3])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[3])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
										<span className="rating-stars">
											<div className="review-stars-text">Location</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[4])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[4])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
										<span className="rating-stars">
											<div className="review-stars-text">Amenities</div>
											<div>
												{[
													...Array(Math.floor(property.avg_ratings[5])).fill(<span>&#9733;</span>),
													...Array(5 - Math.floor(property.avg_ratings[5])).fill(<span>&#9734;</span>)
												]}
											</div>
										</span>
									</div>
								</div>
								<div className="review-address">
									<div >{property.address}</div>
									<button style = {{alignItems: "right"}} className="visit-button">View Reviews</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
