import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantIndexItem from "./restaurant_index_item";
import "./restaurantIndex.css";
import { retrieveRestaurants } from "../../store/restaurant";
import LoadingAnimation from "./subcomponents/Loading_Animation";

const Carousel = ({ cuisine }) => {
  const [slideOffset, setSlideOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 6.2;
  const dispatch = useDispatch();
  const restaurants = useSelector((state) =>
    Object.values(state.restaurant).filter(
      (restaurant) => restaurant.cuisine === cuisine
    )
  );
  const isLoading = useSelector((state) => state.restaurant.isLoading);

  useEffect(() => {
    dispatch(retrieveRestaurants());
  }, [dispatch]);

  if (isLoading || restaurants.length === 0) {
    return <LoadingAnimation />; // Render the loading animation if the carousel is loading or if there are no restaurants
  }

  function goToPrevSlide() {
    if (index > 0) {
      setSlideOffset((prevOffset) => prevOffset + 135 / itemsPerPage);
      setIndex(index - 1);
    } else {
      setSlideOffset((prevOffset) => prevOffset + 50 / itemsPerPage);
      setTimeout(() => {
        setSlideOffset((prevOffset) => prevOffset - 50 / itemsPerPage);
      }, 300);
    }
  }

  function goToNextSlide() {
    if (index !== restaurants.length - 5) {
      setSlideOffset((prevOffset) => prevOffset - 135 / itemsPerPage);
      setIndex(index + 1);
    } else {
      setSlideOffset((prevOffset) => prevOffset - 50 / itemsPerPage);
      setTimeout(() => {
        setSlideOffset((prevOffset) => prevOffset + 50 / itemsPerPage);
      }, 300);
    }
  }

  const slideStyles = {
    transform: `translateX(${slideOffset}%)`,
    transition: "transform .5s ease-in-out",
  };

  return (
    <div className="carousel_wrap">
      <div className="carousel_inner">
        <button className="nav-button-left" onClick={goToPrevSlide}>
          {"<"}
        </button>
        <div className="carousel_container">
          <ul className="carousel_slide-list" style={slideStyles}>
            {restaurants.map((restaurant) => (
              <li className="restaurant-item-outer" key={restaurant.id}>
                <RestaurantIndexItem restaurant={restaurant} />
              </li>
            ))}
          </ul>
        </div>
        <button className="nav-button-right" onClick={goToNextSlide}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
