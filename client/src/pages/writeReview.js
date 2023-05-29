import React, { useState } from 'react';
import "./writeReview.css"

function WriteReview() {
  const [formValues, setFormValues] = useState({
    landlordName: '',
    streetName: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    apartmentNumber: '', 
  });
  
  const [overallRating, setOverallRating] = useState(0);
  const [healthAndSafetyRating, setHealthAndSafetyRating] = useState(0);
  const [repairsRating, setRepairsRating] = useState(0);
  const [respectRating, setRespectRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [writtenReview, setWrittenReview] = useState("");
  const [monthlyCostRange, setMonthlyCostRange] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("In Handle Submit");
    console.log("Form Values:", formValues);
    console.log("OveralRating:", overallRating)
    console.log("Health&Safety:", healthAndSafetyRating)
    console.log("repairsRating:", repairsRating)
    console.log("respectRating:", respectRating)
    console.log("locationRating:", locationRating)
    console.log("amenitiesRating:", amenitiesRating)
    console.log("writtenReview:", writtenReview)
    console.log("Monthly Pay:", monthlyCostRange)
    // submit to backend!
  };

  return (
    <div className="container">
      <h1>Write a Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="landlordName">Landlord Name:</label>
          <input
            type="text"
            id="landlordName"
            name="landlordName"
            className="form-control"
            value={formValues.landlordName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetName">Street Name:</label>
          <input
            type="text"
            id="streetName"
            name="streetName"
            className="form-control"
            value={formValues.streetName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apartmentNumber">Apartment Number:</label>
          <input
            type="text"
            id="apartmentNumber"
            name="apartmentNumber"
            className="form-control"
            value={formValues.apartmentNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formValues.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-control"
            value={formValues.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            className="form-control"
            value={formValues.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            className="form-control"
            value={formValues.zipCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="document-upload">
          <h3>Prove your stay</h3>
          <p>Please submit a document that proves your stay as a tenant:</p>
          <button className="btn btn-primary">Upload File</button>
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
        <button className="submit-button" type="submit">
          Submit Review
        </button>
    </div>

      </form>

    </div>
  );

}

export default WriteReview;