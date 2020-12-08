import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./category-restaurants.scss";

const CategoryRestaurants = () => {
  const { category } = useParams();

  return (
    <div className="category-restaurants">
      <Breadcrumbs />
      <section className="category-restaurants__restaurants">
        <h1 className="category-restaurants__heading">
          The best places for the {category}
        </h1>
      </section>
    </div>
  );
};

export default CategoryRestaurants;
