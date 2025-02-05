import React, { useEffect, useState } from "react";

const RatingFilterComponent = ({ onRatingChange, reset }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const ratings = [1, 2, 3, 4];

  useEffect(() => {
    if (reset) {
      setSelectedRating(null); // Reset internal state when reset prop is triggered
      onRatingChange(null); // Notify parent component of reset
    }
  }, [reset, onRatingChange]);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <div role="group" aria-labelledby="rating-filter">
      <h5 id="rating-filter" className="fw-bolder">
        Ratings
      </h5>
      {ratings.map((rating) => (
        <div
          key={rating}
          style={{ marginBottom: "0.5rem" }}
          className="form-check"
        >
          <input
            type="radio"
            id={`rating-${rating}`}
            name="rating"
            className="form-check-input"
            value={rating}
            checked={selectedRating === rating} // Ensure radio button reflects state
            onChange={() => handleRatingSelect(rating)} // Handle rating selection
            aria-label={`Select rating ${rating} & above`}
          />
          <label htmlFor={`rating-${rating}`} className="form-check-label">
            {rating} Stars & above
          </label>
        </div>
      ))}
    </div>
  );
};

export default RatingFilterComponent;
