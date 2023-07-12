import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveReviewsByRestaurantId } from "../../../store/review";

const RestaurantStarRating = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await dispatch(retrieveReviewsByRestaurantId(restaurantId));
        // Check if reviews were successfully fetched
        if (fetchedReviews) {
          // Reviews were fetched successfully
          console.log(fetchedReviews); // Verify that reviews are retrieved correctly
        } else {
          // Failed to retrieve reviews
          console.log("Failed to retrieve reviews");
        }
      } catch (error) {
        console.error("Failed to retrieve reviews:", error);
      }
    };

    fetchReviews();
  }, [dispatch, restaurantId]);

  if (!reviews || reviews.length === 0) {
    return <div>No reviews</div>; // Display "No reviews" when there are no reviews available or reviews is undefined
  }

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce(
      (sum, review) =>
        sum +
        review.food_rating +
        review.service_rating +
        review.ambience_rating +
        review.value_rating,
      0
    );
    const averageRating = totalRating / (4 * reviews.length);
    return isNaN(averageRating) ? 0 : averageRating;
  };

  const averageRating = calculateAverageRating();
  const filledStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const renderStarRating = () => {
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <i key={`filled-star-${i}`} className="fas fa-star" style={{ color: "#da3743" }}></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half-star" className="fas fa-star-half-alt" style={{ color: "#da3743" }}></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-star-${i}`} className="far fa-star" style={{ color: "#da3743" }}></i>
      );
    }

    return stars;
  };

  return <div>{renderStarRating()}</div>;
};

export default RestaurantStarRating;
