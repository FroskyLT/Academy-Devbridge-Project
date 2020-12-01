import React from "react";
import { RestaurantIntroCard } from "../RestaurantIntroCard/RestaurantIntroCard";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./best-restaurant-section.scss";
import { Ratings } from "../../Rating/maxRatings";

const BestRestaurantSection = () => {
  return (
    <div className="best-restaurants">
      <RestaurantIntroCard />
      <RestaurantCard
        image={Ratings.numberOneRating()[6]}
        checkins={Ratings.numberOneRating()[0]}
        rating={Ratings.numberOneRating()}
        category={Ratings.numberOneRating()}
        title={Ratings.numberOneRating()[4]}
        hours={Ratings.numberOneRating()[5]}
      ></RestaurantCard>
      <RestaurantCard
        image={Ratings.numberTwoRating()[6]}
        checkins={Ratings.numberTwoRating()[0]}
        rating={Ratings.numberTwoRating()}
        category={Ratings.numberTwoRating()}
        title={Ratings.numberTwoRating()[4]}
        hours={Ratings.numberTwoRating()[5]}
      ></RestaurantCard>
    </div>
  );
};

export default BestRestaurantSection;
