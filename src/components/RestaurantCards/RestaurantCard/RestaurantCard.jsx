import React from "react";
import PropTypes from "prop-types";
import { CardContainer } from "../../CardContainer/CardContainer";
import "./restaurant-card.scss";

const RestaurantCard = (props) => {
  const { image, children } = props;
  return (
    <CardContainer styleName="card-container--shadow">
      <div className="restaurant-card">
        <div className="restaurant-card__top">
          <div className="restaurant-card__checkins-rating">
            {props.children}
          </div>
          <div className="restaurant-card__categories">{props.children}</div>
          <div className="restaurant-card__background"></div>
          <img
            src={props.image}
            alt=""
            className="restaurant-card__image"
          ></img>
        </div>
        <div className="restaurant-card__bottom">
          <div className="restaurant-card__name-like">{props.children}</div>
          <div className="restaurant-card__opening-hours">{props.children}</div>
        </div>
      </div>
    </CardContainer>
  );
};
// }

export default RestaurantCard;

RestaurantCard.propTypes = {
  image: PropTypes.string,
  children: PropTypes.object,
};
