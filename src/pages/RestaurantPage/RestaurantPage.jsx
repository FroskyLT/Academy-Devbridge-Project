import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import RestaurantsCarousel from "components/RestaurantsCarousel/RestaurantsCarousel";
import InformationSection from "components/InformationSection/InformationSection";
import { RestaurantInteractionsBanner } from "components/RestaurantInteractionsBanner/RestaurantInteractionsBanner";
import { Ratings } from "components/Rating/maxRatings";
import "./restaurant-page.scss";
import { LocationSection } from "components/LocationSection/LocationSection";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(url);
      const data = await response.json();
      const restaurantList = data.restaurantList;
      setData(restaurantList);
      setLoading(false);
    }

    fetchMyAPI();
  }, [url]);

  return { data, loading };
};

const RestaurantPage = () => {
  const { restaurant } = useParams();

  const { data, loading } = useFetch("http://localhost:3008/restaurants");

  // Use mainRestaurant to get website, address etc., e.g. mainRestaurant.website
  const mainRestaurant = data.find((rest) => rest.name === restaurant);

  const indexOfMainRestaurant = data.indexOf(mainRestaurant);

  // Removes mainRestaurant from restaurantList and filters restaurants that have similar categories to mainRestaurant's:
  const similarRestaurants = data
    .filter((rest) => rest !== mainRestaurant)
    .filter((rest) =>
      rest.categories.some((item) => mainRestaurant.categories.includes(item))
    );

  return loading ? (
    <div>...loading</div>
  ) : (
    <div className="restaurant">
      <Breadcrumbs />
      This will be restaurant {restaurant} page
      <section className="restaurant__hero">
        <RestaurantInteractionsBanner
          checkins={mainRestaurant.checkIns}
          rating={Ratings.countRating(indexOfMainRestaurant)}
        />
      </section>
      <section className="restaurant-page__information">
        <h3 className="restaurant-page__heading">Information</h3>
        <InformationSection
          address={mainRestaurant.address}
          phone={mainRestaurant.phone}
          website={mainRestaurant.website}
          openingHours={mainRestaurant.openingHours}
        />
      </section>
      <section className="restaurant-page__location">
        <h3 className="restaurant-page__heading">Location</h3>
        <LocationSection />
      </section>
      <section className="restaurant__similar-restaurants">
        <h3 className="restaurant__heading">Also you could like</h3>
        <RestaurantsCarousel restaurantList={similarRestaurants} />
      </section>
    </div>
  );
};

export default RestaurantPage;
