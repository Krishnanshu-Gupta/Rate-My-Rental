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
  });
  const [healthAndSafetyRating, setHealthAndSafetyRating] = useState(0);
  const [repairsRating, setRepairsRating] = useState(0);
  const [respectRating, setRespectRating] = useState(0);
  const [writtenReview, setWrittenReview] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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

  const handleWrittenReviewChange = (event) => {
    setWrittenReview(event.target.value);
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("In Handle Submit");
    console.log("Form Values:", formValues);
    console.log("Health&Safety:", healthAndSafetyRating)
    console.log("repairsRating:", repairsRating)
    console.log("respectRating:", respectRating)
    console.log("writtenReview:", writtenReview)
    // submit to backend!
  };

  return (
    <div className="container">
      <h1>Rate My Rental</h1>
      <h2>Write a review</h2>
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
// const [healthAndSafetyRating, setHealthAndSafetyRating] = useState(0);
//   const [repairsRating, setRepairsRating] = useState(0);
//   const [respectRating, setRespectRating] = useState(0);
//   const [writtenReview, setWrittenReview] = useState("");

//   const handleHealthAndSafetyRating = (rating) => {
//     setHealthAndSafetyRating(rating);
//   };

//   const handleRepairsRating = (rating) => {
//     setRepairsRating(rating);
//   };

//   const handleRespectRating = (rating) => {
//     setRespectRating(rating);
//   };

//   const handleWrittenReviewChange = (event) => {
//     setWrittenReview(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // TODO: save the review data to state or send it to a backend server
//     console.log({
//       healthAndSafetyRating,
//       repairsRating,
//       respectRating,
//       writtenReview,
//     });
//   };

//   return (
//     <div className="container">
//       <h1>Review Your Stay</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="rating-section">
//           <h3>Health and Safety</h3>
//           <p>Complies with local health and safety standards</p>
//           <div className="rating-buttons">
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <button
//                 key={rating}
//                 className={`rating-button ${
//                   healthAndSafetyRating === rating ? "selected" : ""
//                 }`}
//                 type="button"
//                 onClick={() => handleHealthAndSafetyRating(rating)}
//               >
//                 {rating}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="rating-section">
//           <h3>Repairs</h3>
//           <p>Kept the premises safe and in good condition</p>
//           <div className="rating-buttons">
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <button
//                 key={rating}
//                 className={`rating-button ${
//                   repairsRating === rating ? "selected" : ""
//                 }`}
//                 type="button"
//                 onClick={() => handleRepairsRating(rating)}
//               >
//                 {rating}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="rating-section">
//           <h3>Respect</h3>
//           <p>
//             Respect the tenant and their privacy, and act in a cordial manner.
//           </p>
//           <div className="rating-buttons">
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <button
//                 key={rating}
//                 className={`rating-button ${
//                   respectRating === rating ? "selected" : ""
//                 }`}
//                 type="button"
//                 onClick={() => handleRespectRating(rating)}
//               >
//                 {rating}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="review-section">
//           <h3>Written Review</h3>
//           <textarea
//             className="review-textarea"
//             value={writtenReview}
//             onChange={handleWrittenReviewChange}
//           />
//         </div>
//         <button className="submit-button" type="submit">
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
}

export default WriteReview;



// <div className="review-section">
// <h2>Review Your Stay</h2>
// {/* Add review form here */}
// </div>

// <button type="submit" className="btn btn-primary">
// Submit
// </button>