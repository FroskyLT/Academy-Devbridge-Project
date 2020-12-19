import React from "react";
import propTypes from "prop-types";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CardContainer } from "../CardContainer/CardContainer";
import "./review.scss";

const Review = (props) => {
  const { username, comment, rating } = props;

  return (
    <CardContainer styleName="card-container--shadow">
      <div className="review">
        <div className="review__username">{username}</div>
        <p className="review__text">{comment}</p>
        <div className="review__rating">
          <div className="review_rating-svg">
            <SVGIcon name="starFilled" />
          </div>
          <span className="review__rating-number">{rating}</span>
        </div>
      </div>
    </CardContainer>
  );
};

export default Review;

Review.propTypes = {
  username: propTypes.string,
  comment: propTypes.string,
  rating: propTypes.number,
};
