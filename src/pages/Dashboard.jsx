import React from "react";
import GreetingWidget from "../components/GreetingWidget/GreetingWidget";
import BestRestaurantWrapper from "../components/RestaurantCards/BestRestaurantWrapper/BestRestaurantWrapper";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <GreetingWidget />
        <div>Placeholder for weather widget</div>
      </section>
      <section className="dashboard__reservations">
        <h2 className="dashboard__heading">Reservations</h2>
        <BestRestaurantWrapper></BestRestaurantWrapper>
      </section>
      <section className="dashboard__news-and-stories">
        <h2 className="dashboard__heading">News and Stories</h2>
      </section>
    </div>
  );
};

export default Dashboard;
