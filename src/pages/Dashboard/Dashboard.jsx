import React from "react";
import "./dashboard.scss";
import WeatherWidget from "components/WeatherWidget/WeatherWidget";
import GreetingWidget from "../../components/GreetingWidget/GreetingWidget";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import database from "../../db.json";
import BestRestaurantWrapper from "../../components/RestaurantCards/BestRestaurantWrapper/BestRestaurantWrapper";
import NewsFeed from "../../components/NewsFeedCard/NewsFeed";

const Dashboard = () => {
  const reservationsData = database.userData.reservations;

  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <GreetingWidget />
        <WeatherWidget />
      </section>
      <section className="dashboard__reservations">
        <h2 className="dashboard__heading">Reservations</h2>
        <div className="dashboard__reservations-cards">
          <CategoryCard
            category="devices"
            icon="Phone"
            totalNumber={reservationsData.devices.length}
            keyword={"reserved"}
            directTo="dashboard/reservations"
          />
          <CategoryCard
            category="books"
            icon="Book"
            totalNumber={reservationsData.books.length}
            keyword={"reserved"}
            directTo="dashboard/reservations"
          />
          <CategoryCard
            category="meeting rooms"
            icon="Door"
            totalNumber={reservationsData.meetingRooms.length}
            keyword={"reserved"}
            directTo="dashboard/reservations"
          />
        </div>
        <BestRestaurantWrapper />
      </section>
      <section className="dashboard__newsFeed">
        <h2 className="dashboard__heading">News and Stories</h2>
        <NewsFeed />
      </section>
    </div>
  );
};

export default Dashboard;
