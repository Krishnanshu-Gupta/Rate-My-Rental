import React from 'react';
import './AllReviews.css';
import { properties } from '../components/propertiesData';

function AllReviews({ property_id }) {
  const filteredProperties = properties.filter(
    (property) => property.propertyId.$oid === property_id
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

  return (
    <div className="property-container">
      {filteredProperties.map((property) => (
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
      ))}
    </div>
  );
}

export default AllReviews;
