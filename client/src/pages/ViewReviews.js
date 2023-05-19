import React from "react";
import  "./ViewReviews.css"


function Home() {
  
  return (
    <div className="view-review-container">
      {/* First Entry */}
      <div className="search-results">
        {/* Entry Box */}
        <div className="entry-box">
          {/* Landlord Details */}
          <div className="landlord-details">
            <p>
              <strong>Landlord Name:</strong> John Doe
            </p>
            <p>
              <strong>Address:</strong> 123 Main St
            </p>
            <p>
              <strong>Overall Rating:</strong>{" "}
              <span className="rating-stars">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
              </span>
            </p>
          </div>

          {/* Ratings */}
          <div className="ratings">
            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Health & Safety:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </span>
              </p>
            </div>

            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Respect:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9734;</span>
                </span>
              </p>
            </div>

            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Repair:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9734;</span>
                </span>
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews">
            {/* Review Wrapper */}
            <div className="review-wrapper">
              <div className="review">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse scelerisque, leo sed consectetur ullamcorper.
                </p>
              </div>
            </div>
            {/* Repeat the review-wrapper for each review */}
          </div>
        </div>
      </div>

      {/* Report Review */}
      <div className="report-review">
        <p>Have an issue with this review?</p>
        <button className="report-button">Report this review</button>
      </div>

      {/* Second Entry */}
      <div className="search-results">
        {/* Entry Box */}
        <div className="entry-box">
          {/* Landlord Details */}
          <div className="landlord-details">
            <p>
              <strong>Landlord Name:</strong> Jane Smith
            </p>
            <p>
              <strong>Address:</strong> 456 Elm St
            </p>
            <p>
              <strong>Overall Rating:</strong>{" "}
              <span className="rating-stars">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9734;</span>
              </span>
            </p>
          </div>

          {/* Ratings */}
          <div className="ratings">
            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Health & Safety:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9734;</span>
                </span>
              </p>
            </div>

            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Respect:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </span>
              </p>
            </div>

            {/* Rating Wrapper */}
            <div className="rating-wrapper">
              <p>
                <strong>Repair:</strong>{" "}
                <span className="rating-stars">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9734;</span>
                </span>
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews">
            {/* Review Wrapper */}
            <div className="review-wrapper">
              <div className="review">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </p>
              </div>
            </div>
            {/* Repeat the review-wrapper for each review */}
          </div>
        </div>
      </div>

      {/* Report Review */}
      <div className="report-review">
        <p>Have an issue with this review?</p>
        <button className="report-button">Report this review</button>
      </div>
    </div>
  );
}

export default Home;